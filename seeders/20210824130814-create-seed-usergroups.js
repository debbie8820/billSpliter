'use strict';

const idList = [5, 15, 25, 35, 45]
const groupId = [...idList, ...idList, ...idList]
const userId = [...idList, ...idList, ...idList].sort((a, b) => { return a - b })

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserGroups',
      Array.from({ length: 15 }).map((d, i) => ({
        UserId: userId[i],
        GroupId: groupId[i],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserGroups', null, {})
  }
};
