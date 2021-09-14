'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Friendships',
      [
        {
          followerId: 5,
          followingId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 5,
          followingId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 15,
          followingId: 25,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 15,
          followingId: 45,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 25,
          followingId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 25,
          followingId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 35,
          followingId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 35,
          followingId: 25,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 45,
          followingId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          followerId: 45,
          followingId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Friendships', null, {})
  }
};
