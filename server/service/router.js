const _ = require('lodash')
const requireDir = require('require-dir')
const KoaRouter = require('koa-router')
const ajv = require('./ajv')

class QRouter {
  constructor ({ errorHandle, router, before }) {
    this.router = router || KoaRouter()
    this.addErrorHandler(errorHandle)
    this.before = before || []
  }

  get routes () {
    return this.router.routes()
  }

  /**
   * 设置错误处理
   */
  addErrorHandler (errorHandle) {
    if (typeof errorHandle === 'function') {
      this.router.all('*', errorHandle())
    }
  }

  addApis (dirPath, prefixes = []) {
    const self = this
    if (typeof prefixes === 'string') prefixes = [prefixes]
    const files = _.map(requireDir(dirPath, { recurse: true }), (ele) => {
      if (typeof ele === 'function') return ele
      return _.values(ele)
    })

    _.flattenDeep(files).forEach(function (func) {
      if (func.route) {
        const [method, route] = func.route
        let before = func.before || []
        before = self.before.concat(before)
        const after = func.after || []
        const validator = (func.validator && [ajv(func.validator)]) || []
        const args = _.concat(validator, before, [func], after)
        if (route instanceof Array) {
          route.forEach((rt) => {
            prefixes.forEach(prefix => {
              self.router[method].apply(self.router, [`${prefix}${rt}`].concat(args))
            })
          })
        } else if (typeof route === 'string') {
          prefixes.forEach(prefix => {
            self.router[method].apply(self.router, [`${prefix}${route}`].concat(args))
          })
        }
      }
    })
  }
}

module.exports = QRouter
