const { Group, UserGroup } = require('../models')

const groupService = {
  postGroup: async (data) => {
    try {
      const { name, img, members } = data
      const { id: GroupId } = await Group.create({ name, img })
      await UserGroup.bulkCreate(Array.from({ length: members.length }).map((d, i) => ({
        UserId: members[i],
        GroupId,
        createdAt: new Date(),
        updatedAt: new Date()
      })))
      return GroupId
    }
    catch (err) {
      throw err
    }
  }
}

module.exports = groupService