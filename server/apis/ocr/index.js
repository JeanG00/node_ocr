const imageInfo = require('server/middlewares/image-info')

const info = async (ctx) => {
  const { images } = ctx.request.body

  await Promise.all(images.map(async image => await ctx.db.image.create(image)))
  ctx.body = images
}
info.route = ['post', '/ocr']
info.before = [imageInfo()]
module.exports = info
