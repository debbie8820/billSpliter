'use strict';

const groupId = [5, 15, 25, 35, 45]
const groupIdList = [...groupId, ...groupId, ...groupId, ...groupId].sort((a, b) => { return a - b })
const groupList = {
  5: [5, 15, 35],
  15: [5, 25, 35],
  25: [5, 25, 45],
  35: [15, 25, 45],
  45: [15, 35, 45]
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ExpenseDetails',
      Array.from({ length: 20 }).map((d, i) => ({
        ExpenseId: (i + 1) * 10 - 5 + 500,
        payerId: groupList[groupIdList[i]][Math.floor(Math.random() * 3)],
        payeeId: groupList[groupIdList[i]][Math.floor(Math.random() * 3)],
        amount: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ExpenseDetails', null, {})
  }
};
