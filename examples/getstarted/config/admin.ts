// module.exports = ({ env }) => ({
//   // autoOpen: false,
//   auth: {
//     secret: env('ADMIN_JWT_SECRET', 'example-token'),
//   },
//   apiToken: {
//     salt: env('API_TOKEN_SALT', 'example-salt'),
//   },
//   auditLogs: {
//     enabled: env.bool('AUDIT_LOGS_ENABLED', true),
//   },
//   transfer: {
//     token: {
//       salt: env('TRANSFER_TOKEN_SALT', 'example-salt'),
//     },
//   },
//   flags: {
//     nps: env.bool('FLAG_NPS', true),
//   },
// });

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
  },
});
