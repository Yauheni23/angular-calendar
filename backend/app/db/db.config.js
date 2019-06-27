const env = require('./env.js');
const searchParamsDb = require('../utils/searchParams');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    searchParamsDb('name'),
    searchParamsDb('user'),
    searchParamsDb('pass'),
    {
        host: searchParamsDb('host') || env.host,
        dialect: env.dialect,
        operatorsAliases: false,
        logging: false,

        pool: {
            max: env.pool.max,
            min: env.pool.min,
            acquire: env.pool.acquire,
            idle: env.pool.idle,
        },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.guide = require('../models/guide')(sequelize, Sequelize);

module.exports = db;
