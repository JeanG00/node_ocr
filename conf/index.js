const app = require('./app')
const db = require('./service/db')
const ocr = require('./service/ocr')

const config = Object.assign({}, app, db, ocr)

const debug = require('debug')('os:config')

debug(config)

module.exports = config
