const imgur = require('imgur-node-api')

const imgurUpload = (filePath) => {
  return new Promise((resolve, reject) => {
    imgur.upload(filePath, (err, res) => {
      if (err) return reject(err)
      return resolve(res.data.link)
    })
  })
}

module.exports = imgurUpload