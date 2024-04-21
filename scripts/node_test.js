const { exec } = require('child_process')
require('app-module-path').addPath(__dirname)
const thunks = require('thunks')()

const execCmd = (command) =>
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

thunks(async () => {
  try {
    const res = await execCmd('tesseract ./assets/WechatIMG20.jpg test -l chi_sim')
    console.log('RESULT:', res)
  } catch (e) {
    console.log('ERROR ENCOUNTED: ', e)
  }
  await new Promise((resolve) => setTimeout(() => resolve(true), 1000))

  console.log('over...')
  process.exit(0)
})(console.log)
