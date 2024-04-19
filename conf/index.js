const app = require('./app')
const db = require('./service/db')

const config = Object.assign({}, app, db)

const debug = require('debug')('os:config')

debug(config)

module.exports = config
