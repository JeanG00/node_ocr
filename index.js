require('app-module-path').addPath(__dirname)

const conf = require('conf')

const app = require('server/app')
module.exports = app.listen(conf.port, function () {
  console.info(`Server listen on ${conf.port}`)
})
