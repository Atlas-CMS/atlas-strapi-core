'use strict';

module.exports = () => ({
  documentation: {
    enabled: false,
  },
  // graphql: {
  //   enabled: true,
  //   config: {
  //     endpoint: '/graphql',

  //     defaultLimit: 25,
  //     maxLimit: 100,

  //     apolloServer: {
  //       tracing: true,
  //     },
  //   },
  // },
  // documentation: {
  //   config: {
  //     info: {
  //       version: '1.0.0',
  //     },
  //   },
  // },
  'plugin-atlas-ckeditor': {
    resolve: './src/plugins/plugin-atlas-ckeditor',
    enabled: true,
  },
  'bold-title-editor': {
    resolve: './src/plugins/strapi-plugin-bold-title-editor',
    enabled: true,
  },
  'react-icons': {
    resolve: './src/plugins/strapi-plugin-react-icons',
    enabled: true,
  },
});
