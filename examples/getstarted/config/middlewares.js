'use strict';

const responseHandlers = require('./src/response-handlers');

// module.exports = [
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::logger',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   // 'strapi::compression',
//   // 'strapi::ip',
//   {
//     name: 'strapi::responses',
//     config: {
//       handlers: responseHandlers,
//     },
//   },
//   'strapi::favicon',
//   'strapi::public',
//   {
//     name: 'global::test-middleware',
//     config: {
//       foo: 'bar',
//     },
//   },
//   {
//     resolve: './src/custom/middleware.js',
//     config: {},
//   },
// ];

module.exports = [
  'strapi::errors',

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': [
            "'self'",
            'editor.unlayer.com',
            'https://cdn.ckeditor.com',
            'unsafe-inline',
            'https://*.basemaps.cartocdn.com',
          ],

          'frame-src': [
            "'self'",
            'editor.unlayer.com',
            'plausible.io',
            '*.plausible.io',
            'youtube.com',
            'www.youtube.com',
            'vimeo.com',
            '*.vimeo.com',
            'facebook.com',
            'www.facebook.com',
            '*.spotify.com',
            'spotify.com',
            'plausible-analytics-ce-production-24cb.up.railway.app',
          ],
          'connect-src': ['ws:', 'wss:', "'self'", 'http:', 'https:'],
          'img-src': [
            "'self'",
            '*.lottiefiles.com',
            'data:',
            'blob:',
            // These four were added for the Email Designer plugin.
            // I'm not sure how secure a blanket allowance for aws images is, but whatever.
            'res.cloudinary.com',
            'cdn.jsdelivr.net',
            's3.amazonaws.com',
            '*.strapi.io',
            'strapi.io',
            'https://*.basemaps.cartocdn.com',
            'https://tile.openstreetmap.org',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',

            'https://*.basemaps.cartocdn.com',
            'https://tile.openstreetmap.org',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  {
    name: 'strapi::responses',
    config: {
      handlers: responseHandlers,
    },
  },
  'strapi::favicon',
  'strapi::public',
  'global::jwtHeaderToAuthorization',
];
