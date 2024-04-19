const Koa = require('koa')
const body = require('koa-body')
const path = require('path')
const conf = require('conf')
const errorHandler = require('server/errors')
const db = require('server/service/db')
const Router = require('server/service/router')
const router = new Router({})
router.addErrorHandler(errorHandler)
router.addApis(path.resolve(__dirname, './apis'), conf.routePrefix)

const app = new Koa()

app.use(async (ctx, next) => {
  if (ctx.path.includes('favicon.ico')) return
  await next()
})

app.context.conf = conf
app.context.db = db
app.context.createErr = require('http-errors').createErr

if (process.env.NODE_ENV !== 'test') app.use(require('koa-morgan')('combined'))

app.use(require('@koa/cors')({ credentials: true }))
app.use(body({
  multipart: true,
  formLimit: conf.fileLimit,
  jsonLimit: conf.fileLimit
}))
app.use(router.routes)

module.exports = app
