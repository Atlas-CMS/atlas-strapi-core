// const sqlite = {
//   client: 'sqlite',
//   connection: {
//     filename: '.tmp/data.db',
//   },
//   useNullAsDefault: true,
// };

// const postgres = {
//   client: 'postgres',
//   connection: {
//     database: 'strapi',
//     user: 'strapi',
//     password: 'strapi',
//     port: 5432,
//     host: 'localhost',
//   },
// };

// const mysql = {
//   client: 'mysql',
//   connection: {
//     database: 'strapi',
//     user: 'strapi',
//     password: 'strapi',
//     port: 3306,
//     host: 'localhost',
//   },
// };

// const mysql2 = {
//   client: 'mysql2',
//   connection: {
//     database: 'strapi',
//     user: 'strapi',
//     password: 'strapi',
//     port: 3306,
//     host: 'localhost',
//   },
// };

// const mariadb = {
//   client: 'mysql',
//   connection: {
//     database: 'strapi',
//     user: 'strapi',
//     password: 'strapi',
//     port: 3307,
//     host: 'localhost',
//   },
// };

// const db = {
//   mysql,
//   mysql2,
//   sqlite,
//   postgres,
//   mariadb,
// };

// module.exports = {
//   connection: process.env.DB ? db[process.env.DB] || db.sqlite : db.sqlite,
// };

// const path = require('path');
// import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    // mysql: {
    //   connection: {
    //     connectionString: env('DATABASE_URL'),
    //     host: env('DATABASE_HOST', 'localhost'),
    //     port: env.int('DATABASE_PORT', 3306),
    //     database: env('DATABASE_NAME', 'strapi'),
    //     user: env('DATABASE_USERNAME', 'strapi'),
    //     password: env('DATABASE_PASSWORD', 'strapi'),
    //     ssl: env.bool('DATABASE_SSL', false) && {
    //       key: env('DATABASE_SSL_KEY', undefined),
    //       cert: env('DATABASE_SSL_CERT', undefined),
    //       ca: env('DATABASE_SSL_CA', undefined),
    //       capath: env('DATABASE_SSL_CAPATH', undefined),
    //       cipher: env('DATABASE_SSL_CIPHER', undefined),
    //       rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
    //     },
    //   },
    //   pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    // },
    // mysql2: {
    //   connection: {
    //     host: env('DATABASE_HOST', 'localhost'),
    //     port: env.int('DATABASE_PORT', 3306),
    //     database: env('DATABASE_NAME', 'strapi'),
    //     user: env('DATABASE_USERNAME', 'strapi'),
    //     password: env('DATABASE_PASSWORD', 'strapi'),
    //     ssl: env.bool('DATABASE_SSL', false) && {
    //       key: env('DATABASE_SSL_KEY', undefined),
    //       cert: env('DATABASE_SSL_CERT', undefined),
    //       ca: env('DATABASE_SSL_CA', undefined),
    //       capath: env('DATABASE_SSL_CAPATH', undefined),
    //       cipher: env('DATABASE_SSL_CIPHER', undefined),
    //       rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
    //     },
    //   },
    //   pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    // },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    // sqlite: {
    //   connection: {
    //     filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    //   },
    //   useNullAsDefault: true,
    // },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
