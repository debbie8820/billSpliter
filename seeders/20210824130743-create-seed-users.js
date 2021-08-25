'use strict';
const bcryptjs = require('bcryptjs')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users',
      Array.from({ length: 5 }).map((d, i) => ({
        id: (i + 1) * 10 - 5,
        account: `@user${i + 1}`,
        password: bcryptjs.hashSync('12345678', 10),
        email: `user${i + 1}@example.com`,
        name: `user${i + 1}`,
        phone: '0912345678',
        avatar: faker.image.image(),
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
