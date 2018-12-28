require('dotenv').config({ path: '../../.env' });

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds',
    }
  },

};
