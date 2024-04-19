/**
 * database configuration
 */

const conf = {
  url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/loki_logger',
  use_cert: process.env.MONGO_USE_CERT || false,
  ca_path: process.env.MONGO_CA_PATH || '',
  client_crt_path: process.env.MONGO_CLIENT_CRT_PATH || '',
  client_key_path: process.env.MONGO_CLIENT_KEY_PATH || '',
  poolSize: process.env.MONGO_POOL_SIZE || 100
}

if (process.env.NODE_ENV === 'test') {
  conf.url =
    process.env.MONGO_TEST_URL || 'mongodb://127.0.0.1:27017/loki_logger_test'
}
module.exports = { db: conf }
