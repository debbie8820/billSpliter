'use strict';
const faker = require('faker')
const groupId = [5, 15, 25, 35, 45]
const groupIdList = [...groupId, ...groupId, ...groupId, ...groupId].sort((a, b) => { return a - b })

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Expenses', //個人消費
      [...Array.from({ length: 50 }).map((d, i) => ({
        id: (i + 1) * 10 - 5,
        name: faker.commerce.productName(),
        amount: faker.commerce.price(),
        date: faker.date.recent(),
        CategoryId: (Math.floor(Math.random() * 5) + 1) * 10 - 5,
        payerId: groupId[Math.floor(Math.random() * 5)],
        createdAt: new Date(),
        updatedAt: new Date()
      })),

      ...Array.from({ length: 20 }).map((d, i) => ({ //群組消費
        id: (i + 1) * 10 - 5 + 500,
        name: faker.commerce.productName(),
        amount: 100,
        date: faker.date.recent(),
        CategoryId: (Math.floor(Math.random() * 5) + 1) * 10 - 5,
        GroupId: groupIdList[i],
        createdAt: new Date(),
        updatedAt: new Date()
      }))]
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Expenses', null, {})
  }
};
