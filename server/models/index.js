module.exports = function (mongoose) {
  return {
    Image: require('./image')(mongoose)
  }
}
