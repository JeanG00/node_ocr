const _ = require('lodash')
const Ajv = require('ajv')
const debug = require('debug')('q-router:ajv')
const defaults = { useDefaults: true, coerceTypes: true }

const pickFieldFromErrors = (errors) => {
  return _.uniq(errors.map((ele) => {
    if (ele.keyword === 'required') {
      return ele.params.missingProperty
    }
    return ele.dataPath.substr(1)
  }))
}

module.exports = function (schema) {
  const target = schema.target || ['params', 'request.body', 'headers', 'query']
  delete schema.target

  const options = Object.assign({}, defaults, schema.ajvOptions || {})
  delete schema.ajvOptions

  const ajv = new Ajv(options)

  ajv.addFormat('objectid', /^[a-z0-9]{24}$/)

  const validator = ajv.compile(schema)

  return async (ctx, next) => {
    const self = ctx
    let data = {}
    if (target instanceof Array) {
      target.forEach((k) => {
        const v = _.result(self, k)
        if (v) _.assign(data, v)
      })
    } else {
      data = _.result(self, target)
    }
    debug('request data', data)
    const isValid = validator(data)
    if (!isValid) {
      const fields = pickFieldFromErrors(validator.errors).join(',')
      if (typeof self.createErr === 'function') {
        throw self.createErr('ParamError', fields)
      } else {
        throw new Error(`ParamError: ${fields}`)
      }
    }
    debug('request valid data', data)
    self.state._data = Object.assign(self.state._data || {}, data)
    await next()
  }
}
