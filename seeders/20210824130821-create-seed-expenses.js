'use strict';
const faker = require('faker')
const groupId = [5, 15, 25, 35, 45]
const userGroupId = [...groupId, ...groupId, ...groupId, ...groupId, ...groupId, ...groupId, ...groupId, ...groupId, ...groupId, ...groupId].sort((a, b) => { return a - b })
const groupList = {
  5: [5, 15, 35],
  15: [5, 25, 35],
  25: [5, 25, 45],
  35: [15, 25, 45],
  45: [15, 35, 45]
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Expenses',
      Array.from({ length: 50 }).map((d, i) => ({
        name: faker.commerce.productName(),
        amount: faker.commerce.price(),
        CategoryId: (Math.floor(Math.random() * 5) + 1) * 10 - 5,
        GroupId: userGroupId[i],
        payerId: groupList[userGroupId[i]][Math.floor(Math.random() * 3)],
        payeeId: groupList[userGroupId[i]][Math.floor(Math.random() * 3)],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Expenses', null, {})
  }
};
