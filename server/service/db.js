const fs = require('fs')
const conf = require('conf')
const mongoose = require('mongoose')

const dbOptions = {
  autoIndex: true,
  maxPoolSize: conf.db.poolSize,
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}

if (conf.db.use_cert && conf.db.ca_path && conf.db.client_crt_path && conf.db.client_key_path) {
  const caFileBuf = fs.readFileSync(conf.db.ca_path)
  const certFileBuf = fs.readFileSync(conf.db.client_crt_path)
  const keyFileBuf = fs.readFileSync(conf.db.client_key_path)

  dbOptions.replset = {
    sslCA: caFileBuf,
    sslCert: certFileBuf,
    sslKey: keyFileBuf
  }
}

const commonEventHandler = (event) => {
  mongoose.connection.on(event, err => {
    console.log(`=================mongoose event: [${event}]======================`, err)
  })
}
const events = {
  error: false,
  connecting: false,
  connected: false,
  disconnected: false,
  reconnected: false,
  close: false,
  reconnectFailed: false
}

// 如果尝试重连此时用尽，则退出程序
events.reconnectFailed = function () {
  mongoose.connection.on('reconnectFailed', err => {
    console.log('=================mongoose event [reconnectFailed]======================', err)
    process.exit(-1)
  })
}
events.error = function () {
  mongoose.connection.on('error', err => {
    console.log('=================mongoose event [error]======================', err)
    if (err.name === 'MongoNetworkError') {
      process.exit(-1)
    }
    if (err.name === 'MongoTimeoutError') {
      process.exit(-1)
    }
  })
}

Object.keys(events).forEach((eventKey) => {
  if (typeof events[eventKey] === 'function') {
    events[eventKey]()
  } else {
    commonEventHandler(eventKey)
  }
})

mongoose.connect(conf.db.url, dbOptions)

const schemas = require('../models')(mongoose)
const models = {}

for (const key in schemas) {
  models[key.toLowerCase()] = mongoose.model(key, schemas[key])
}
module.exports = models
