'use strict';

const findRoot = require('find-root');
const path = require('path');
const fs = require('fs');

let tsconfigFile = fs.readFileSync(`${__dirname}/admin/tsconfig.json`, 'utf8');

// Remove comments from tsconfig

let tsconfig;
eval(`tsconfig = ${tsconfigFile}`);

// console.log({ tsconfig });

const tsAliasData = tsconfig.compilerOptions.paths;

// console.log(__dirname);
// console.log({ tsAliasData });

let tsAlias = {};

for (const [key, value] of Object.entries(tsAliasData)) {
  // Remove trailing slash and asterisk from the alias and the key
  let relativeAlias = value[0].replace(/\/\*$/, '');
  let aliasKey = key.replace(/\/\*$/, '');

  const aliasPath = path.resolve(__dirname, 'admin', relativeAlias);

  tsAlias[aliasKey] = aliasPath;
}

// console.log({ tsAlias });

console.log(
  `[Iliad] (/admin) Configuring aliases for ${
    Object.keys(tsAlias).length
  } paths sourced from tsconfig.json`
);

const aliasExactMatch = [
  '@strapi/design-system',
  '@strapi/helper-plugin',
  '@strapi/icons',
  'date-fns',
  'formik',
  'history',
  'immer',
  'qs',
  'lodash',
  'react',
  'react-dnd',
  'react-dnd-html5-backend',
  'react-dom',
  'react-error-boundary',
  'react-helmet',
  'react-is',
  'react-intl',
  'react-query',
  'react-redux',
  'react-router-dom',
  'react-window',
  'react-select',
  'redux',
  'reselect',
  'styled-components',
  'yup',
];

const parsedAliases = aliasExactMatch.reduce((acc, moduleName) => {
  acc[`${moduleName}$`] = findRoot(require.resolve(moduleName));
  return acc;
}, {});

// console.log({ parsedAliases });

// See https://webpack.js.org/configuration/resolve/
module.exports = {
  ...parsedAliases,
  ...tsAlias,
};
