'use strict';
const faker = require('faker')
const names = [
  '高雄三日遊',
  '高中同學GO',
  '家族旅遊',
  '澎湖之旅',
  '跨年101'
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Groups',
      Array.from({ length: 5 }).map((d, i) => ({
        id: (i + 1) * 10 - 5,
        name: names[i],
        img: faker.image.image(),
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Groups', null, {})
  }
};
