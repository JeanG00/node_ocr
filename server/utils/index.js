const { exec } = require('child_process')
const fs = require('fs')
const crypto = require('crypto')

exports.readFile = (filepath, encoding = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })

exports.calculateMD5 = (filePath) =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5')
    const input = fs.createReadStream(filePath)

    input.on('data', (chunk) => {
      hash.update(chunk)
    })

    input.on('end', () => {
      const md5Hash = hash.digest('hex')
      resolve(md5Hash)
    })

    input.on('error', (err) => {
      reject(err)
    })
  })

exports.exec = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message)
      } else if (stderr) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })

exports.sleep = (milli = 1000) => setTimeout(() => {}, milli)
