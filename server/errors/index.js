const _ = require('lodash')
const createErr = require('http-errors')
const Locales = require('./locale')

const slice = Array.prototype.slice
const locales = ['en', 'zh']
const localErrMap = Object.create(null)

class LocalErr {
  constructor (name, code) {
    this.name = name || ''
    this.code = code || 0
    this.status = 400
    this.locales = {}
  }
}

for (const locale of locales) {
  Object.keys(Locales).forEach(function (key) {
    const [code, name] = key.split('.')
    const localeKey = name
    localErrMap[localeKey] || (localErrMap[localeKey] = new LocalErr(name, code))
    localErrMap[localeKey].locales[locale] = Locales[key][locale]
  })
}

createErr.HttpError.prototype._localeArgs = []
createErr.HttpError.prototype.setLocale = function (locale) {
  const localErr = localErrMap[this.message] || localErrMap[this.name] || localErrMap[this.status]

  if (localErr) {
    if (localErr.name) {
      this.name = localErr.name
    }
    this.code = localErr.code
    this.status = localErr.status
    const message = localErr.locales[locale]
    if (typeof message === 'function') {
      this.message = message.apply(null, this._localeArgs)
    } else if (message) {
      this.message = message
    }
  }
  return this
}

// 使用方法：
// 1. createErr(400)
// 2. createErr(400, 'some thing error')
// 3. createErr('ParamError')
// 3. createErr('ParamError', 'dueDate')
createErr.createErr = function (errName) {
  const localErr = localErrMap[errName]
  let err
  if (localErr) {
    err = createErr(localErr.status)
    if (localErr.name) {
      err.name = localErr.name
    } // 需要取得 locale 后才有 i18n 的 message
    err._localeArgs = slice.call(arguments, 1)
  } else {
    err = createErr.apply(null, arguments)
  }
  return err
}

module.exports = function () {
  return async (ctx, next) => {
    let err
    try {
      await next()
      const status = ctx.status || 404
      if (status === 404) {
        ctx.throw(404)
      }
      if (ctx.state.keepRaw) {
        return
      }
      const resData = {
        code: 0,
        data: ctx.body
      }
      const total = _.result(ctx.state, 'paginate.total')
      if (!isNaN(total)) resData.paginate = _.result(ctx.state, 'paginate')
      ctx.body = resData
    } catch (e) {
      if (e.status === 404) {
        err = createErr.createErr('APINotFound')
      } else {
        if (e instanceof createErr.HttpError) {
          err = e
        } else {
          err = createErr.createErr(e)
        }
      }
      const locale = ctx.query.lang || ctx.cookies.get('lang') || 'zh'
      ctx.status = 200
      if (err.setLocale) err.setLocale(locale)
      if (err.status >= 500) {
        err.uri = ctx.request.originalUrl
        err.code = -1
      }
      ctx.body = _.assign(
        {
          message: err.message,
          code: parseInt(err.code)
        },
        err.data || {}
      )
      console.error('SUPER BUG', { errMessage: err.message, errorCode: err.code, status: err.status, uri: ctx.originalUrl, method: ctx.request.method, ip: ctx.request.ip, ...(err.data || {}) })
    }
  }
}
