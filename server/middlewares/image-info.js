const _ = require('lodash')
const debug = require('debug')('app:middlewares:image')
const fs = require('fs')
const sharp = require('sharp')
const ExifParser = require('exif-parser')
const { exec, readFile, calculateMD5 } = require('server/utils')
const { ocr } = require('conf')

module.exports = () => {
  return async (ctx, next) => {
    const params = _.get(ctx, 'request.body') || {}
    const input = {
      ...params,
      lang: params.lang || ocr.lang,
      oem: params.oem || ocr.oem,
      psm: params.psm || ocr.psm
    }
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
            ]),
            input
          }
        } catch (err) {
          debug('#SHARP#', err.message)
        }
        try {
          const filedata = fs.readFileSync(localFile)
          const parser = ExifParser.create(filedata)
          const info = parser.parse()
          debug('PARSER', info)
        } catch (err) {
          debug('#PARSER#', err.message)
        }
        let defaultFile = ocr.defaultFile
        try {
          const milli = new Date().getMilliseconds()
          const hash = await calculateMD5(localFile)
          defaultFile = `${milli}_${hash}`
        } catch (err) {
          console.log('MD5 file hash', err.message)
        }
        try {
          const command = `${ocr.command} ${localFile} ${defaultFile} -l ${input.lang} --psm ${input.psm} --oem ${input.oem}`
          debug('ocr commmand', command)
          await exec(command)
        } catch (err) {
          result.ocr_err = err
          // throw ctx.createErr('OCRError', err)
        }
        try {
          result.content = await readFile(defaultFile)
        } catch (err) {
          debug('file read', err.message)
        } finally {
          fs.unlink(defaultFile, () => {})
        }
        return result
      })
    )
    if (!_.isArray(files)) files = [files]
    debug('image', ctx.request.body.images)
    await next()
  }
}
