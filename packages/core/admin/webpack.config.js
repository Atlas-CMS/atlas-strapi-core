'use strict';

const webpack = require('webpack');
const path = require('path');

// Configuration
const getClientEnvironment = require('./env');
const alias = require('./webpack.alias');

// Utils
const { createPluginsExcludePath } = require('./utils/plugins');

// Plugins / Loaders / etc
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const browserslistToEsbuild = require('browserslist-to-esbuild');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const browserslist = require('browserslist');
const WebpackBar = require('webpackbar');

module.exports = ({
  options = {
    backend: 'http://localhost:1337',
    adminPath: '/admin/',
    features: [],
  },
  enforceSourceMaps,
  tsConfigFilePath,
  optimize,
  plugins,
  entry,
  dest,
  env,
}) => {
  const envVariables = getClientEnvironment({ ...options, env });
  const isProduction = env === 'production';

  const webpackPlugins = isProduction
    ? [
        new WebpackBar(),
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
          chunkFilename: '[name].[chunkhash].chunkhash.css',
          ignoreOrder: true,
        }),
      ]
    : [];

  const nodeModulePluginPaths = Object.values(plugins)
    .filter((plugin) => plugin.info?.packageName || plugin.info?.required)
    .map((plugin) => plugin.pathToPlugin);

  const excludeRegex = createPluginsExcludePath(nodeModulePluginPaths);

  // Ensure we use the config in this directory, even if run with a different
  // working directory
  const browserslistConfig = browserslist.loadConfig({ path: __dirname });
  const buildTarget = browserslistToEsbuild(browserslistConfig);

  return {
    devtool: isProduction && !enforceSourceMaps ? false : 'source-map',
    mode: isProduction ? 'production' : 'development',
    bail: !!isProduction,
    entry: [entry],
    experiments: {
      topLevelAwait: true,
    },
    output: {
      chunkFilename: isProduction ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
      // Utilize long-term caching by adding content hashes (not compilation hashes)
      // to compiled assets for production
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].bundle.js',
      publicPath: options.adminPath,
      path: dest,
    },
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: buildTarget,
          css: true, // Apply minification to CSS assets
        }),
      ],
      moduleIds: 'deterministic',
      minimize: optimize,
      runtimeChunk: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: excludeRegex, // -- I'm disabling this because if I don't everything gets fricked up.
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: buildTarget,
              jsx: 'automatic',
            },
          },
        },
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: excludeRegex, // -- I'm disabling this because if I don't everything gets fricked up.
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: buildTarget,
            },
          },
        },
        /**
         * This is used to avoid webpack import errors where
         * the origin is strict EcmaScript Module.
         *
         * e. g. a module with javascript mimetype, a '.mjs' file,
         * or a '.js' file where the package.json contains '"type": "module"'
         */
        {
          test: /\.m?jsx?$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.module\.(scss|sass)$/,
          use: [
            // Configuration sourced from https://www.npmjs.com/package/css-loader#examples
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                import: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /\.module\.(scss|sass)$/,
          use: [
            // Don't muck with the order of these loaders
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: { import: true },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
          type: 'asset/resource',
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 1000,
            },
          },
        },
        {
          test: /\.html$/,
          include: [path.join(__dirname, 'src')],
          use: require.resolve('html-loader'),
        },
        {
          test: /\.(mp4|webm)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10000,
            },
          },
        },
      ],
    },
    resolve: {
      alias,
      extensions: [
        '.js',
        '.jsx',
        '.react.js',
        '.ts',
        '.tsx',
        '.json',
        '.scss',
        '.css',
        '.sass',
        '.svg',
      ],
    },
    plugins: [
      // new TsconfigPathsPlugin({
      //   configFile: tsConfigFilePath,
      // }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, 'index.html'),
      }),
      new webpack.DefinePlugin(envVariables),

      new ForkTsCheckerPlugin({
        typescript: {
          configFile: tsConfigFilePath,
        },
      }),
      !isProduction && process.env.REACT_REFRESH !== 'false' && new ReactRefreshWebpackPlugin(),
      ...webpackPlugins,
    ].filter(Boolean),
  };
};
