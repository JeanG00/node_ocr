const conf = require('conf')

module.exports = function ({ Schema }) {
  const ItemSchema = new Schema(
    {
      name: { type: String }, // image name
      size: { type: Number }, // image size
      width: { type: Number },
      height: { type: Number },
      depth: { type: String },
      space: { type: String }, // color space
      hasAlpha: { type: Boolean },
      hasProfile: { type: Boolean },
      lat: { type: Number }, // latitude
      lng: { type: Number }, // longtitude
      ext: { type: String }, // .extension
      mime: { type: String }, // mime type
      content: { type: String }, // image text
      input: { type: Object }, // params
      createdAt: {
        type: Date,
        expires: conf.loggerExpire,
        default: Date.now
      }
    },
    {
      read: 'secondaryPreferred',
      id: false,
      toObject: {
        virtuals: true,
        getters: true
      },
      toJSON: {
        versionKey: false,
        virtuals: true,
        getters: true
      }
    }
  )

  return ItemSchema
}
