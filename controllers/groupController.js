const groupService = require('../services/groupService')
const imgur = require('imgur-node-api')

const imgurUpload = (filePath) => {
  return new Promise((resolve, reject) => {
    imgur.upload(filePath, (err, res) => {
      if (err) return reject(err)
      return resolve(res.data.link)
    })
  })
}


const groupController = {
  postGroup: async (req, res, next) => {
    try {
      const { name, members } = req.body
      let img = null
      const { file } = req
      if (!name || !members || !members.length) {
        throw new Error('Please fill in all the fields')
      }

      if (file) {
        imgur.setClientID(process.env.IMGUR_CLIENT_ID)
        img = await imgurUpload(file.path) || null
      }

      const { GroupId } = await groupService.postGroup({ name, img, members })
      return res.json({ status: 'success', message: 'Group created', GroupId })
    }
    catch (err) {
      next(err)
    }
  },

  getGroup: async (req, res, next) => {
    try {
      const { GroupId } = req.params
      const group = await groupService.getGroup(GroupId)
      return res.json(group)
    }
    catch (err) {
      next(err)
    }
  },

  putGroup: async (req, res, next) => { //members只能修改跟原本一樣的數量
    try {
      const { GroupId } = req.params
      const { name, members } = req.body
      let img
      const { file } = req
      if (!name || !members || !members.length) {
        throw new Error('Please fill in all the fields')
      }

      if (file) {
        imgur.setClientID(process.env.IMGUR_CLIENT_ID)
        img = await imgurUpload(file.path)
      }

      await groupService.putGroup({ name, img, members, GroupId })
      return res.json({ status: 'success', message: 'Group updated', GroupId })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = groupController