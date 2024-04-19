const pkg = require('../package.json')

/**
 * app default config
 * @param { Number } port
 * @param { String } routePrefix route prefix
 * @param { String } version pkg version
 * @param { String } name pkg name
 */

const conf = {
  port: process.env.PORT || 3000,
  name: pkg.name,
  routePrefix: process.env.ROUTE_PREFIX || '',
  version: pkg.version,
  key: process.env.APP_KEY || 'your app key',
  expire: process.env.LOGGER_EXPIRE || 60 * 60 * 24 * 30 // 1 month
}

module.exports = conf
