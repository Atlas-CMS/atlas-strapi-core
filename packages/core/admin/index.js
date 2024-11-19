'use strict';

const { isUsingTypeScript } = require('@strapi/typescript-utils');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');

const {
  createCacheDir,
  watchAdminFiles,
  shouldBuildAdmin,
  getCustomWebpackConfig,
} = require('./utils');

async function build({ appDir, buildDestDir, env, forceBuild, optimize, options, plugins }) {
  const buildAdmin = await shouldBuildAdmin({ appDir, plugins });

  const useTypeScript = await isUsingTypeScript(path.join(appDir, 'src', 'admin'), 'tsconfig.json');

  if (!buildAdmin && !forceBuild) {
    return;
  }

  // Create the cache dir containing the front-end files.
  await createCacheDir({ appDir, plugins });

  const cacheDir = path.resolve(appDir, '.cache');
  const entry = path.resolve(cacheDir, 'admin', 'src');
  const dest = path.resolve(buildDestDir, 'build');

  const enforceSourceMaps = process.env.STRAPI_ENFORCE_SOURCEMAPS === 'true' ?? false;

  // Either use the tsconfig file from the generated app or the one inside the .cache folder
  // so we can develop plugins in TS while being in a JS app
  const tsConfigFilePath = useTypeScript
    ? path.join(appDir, 'src', 'admin', 'tsconfig.json')
    : path.resolve(entry, 'tsconfig.json');

  // if useTypeScript path is  process.cwd()/src/admin/tsconfig.json
  // else path is process.cwd()/.cache/admin/src/tsconfig.json

  const config = getCustomWebpackConfig(appDir, {
    enforceSourceMaps,
    tsConfigFilePath,
    optimize,
    options,
    plugins,
    appDir,
    entry,
    dest,
    env,
  });

  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);

        if (err.details) {
          console.error(err.details);
        }
        return reject(err);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      return resolve({
        warnings: info.warnings,
        stats,
      });
    });
  });
}

async function clean({ appDir, buildDestDir }) {
  // FIXME rename admin build dir and path to build dir
  const buildDir = path.join(buildDestDir, 'build');
  // .cache dir is always located at the root of the app
  const cacheDir = path.join(appDir, '.cache');

  fs.removeSync(buildDir);
  fs.removeSync(cacheDir);
}

async function watchAdmin({ appDir, browser, buildDestDir, host, options, plugins, port }) {
  const useTypeScript = await isUsingTypeScript(path.join(appDir, 'src', 'admin'), 'tsconfig.json');
  // Create the cache dir containing the front-end files.
  const cacheDir = path.join(appDir, '.cache');
  await createCacheDir({ appDir, plugins });

  const entry = path.join(cacheDir, 'admin', 'src');
  const dest = path.join(buildDestDir, 'build');
  const env = 'development';

  // Either use the tsconfig file from the generated app or the one inside the .cache folder
  // so we can develop plugins in TS while being in a JS app
  const tsConfigFilePath = useTypeScript
    ? path.join(appDir, 'src', 'admin', 'tsconfig.json')
    : path.resolve(entry, 'tsconfig.json');

  const args = {
    appDir,
    cacheDir,
    dest,
    entry,
    env,
    options,
    plugins,
    devServer: {
      devMiddleware: {
        publicPath: options.adminPath,
      },
      historyApiFallback: {
        index: options.adminPath,
        disableDotRule: true,
      },
      client: {
        logging: 'none',
        overlay: {
          warnings: false,
          errors: true,
        },
      },
    },
    open: browser === 'true' ? true : browser,
    tsConfigFilePath,
    port,
  };

  const webpackConfig = getCustomWebpackConfig(appDir, args);
  const compiler = webpack(webpackConfig);

  const devServerArgs = {
    ...args.devServer,
    ...webpackConfig.devServer,
  };

  const server = new WebpackDevServer(devServerArgs, compiler);

  const runServer = async () => {
    const name = chalk.rgb(73, 69, 255)(`[ ${chalk.bold(ATLAS_NAME)} ]`); // Atlas
    console.log(name, chalk.green('Starting the development server...'));
    console.log();
    console.log(
      name,
      chalk.green(`Admin development at http://${host}:${port}${options.adminPath}`)
    );

    await server.start();
  };

  runServer();

  watchAdminFiles(appDir, useTypeScript);
}

module.exports = {
  watchAdmin,
  clean,
  build,
};
