const _ = require('lodash')
const debug = require('debug')('app:middlewares:image')
const fs = require('fs')
const sharp = require('sharp')
const ExifParser = require('exif-parser')

module.exports = () => {
  return async (ctx, next) => {
    // const suffix = _.get(ctx, 'request.body.suffix')
    // const prefix = _.get(ctx, 'request.body.prefix')
    let files = _.result(ctx.request.files, 'file')

    if (_.isEmpty(files)) {
      throw ctx.createError('ParamError', 'file')
    }
    if (!_.isArray(files)) files = [files]
    ctx.request.body.images = await Promise.all(
      files.map(async (file) => {
        const localFile = file.path
        let result = {
          name: file.name,
          size: file.size,
          mime: file.type
        }
        try {
          const meta = await sharp(localFile).metadata()
          result = {
            ...result,
            ext: meta.format,
            ..._.pick(meta, [
              'width',
              'height',
              'depth',
              'space',
              'hasAlpha',
              'hasProfile',
              'channels',
              'density'
            ])
          }
        } catch (err) {
          console.error('sharp ########', err.message)
        }
        try {
          const filedata = fs.readFileSync(localFile)
          const parser = ExifParser.create(filedata)
          const info = parser.parse()
          console.log(info)
        } catch (err) {
          console.log('parser ########', err.message)
        }
        return result
      })
    )
    if (!_.isArray(files)) files = [files]
    debug('image', ctx.request.body.images)
    await next()
  }
}
