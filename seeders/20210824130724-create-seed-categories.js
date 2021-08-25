'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',
      [
        {
          id: 5,
          code: 'food',
          icon: 'fast-food-outline',
          name: '食物',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 15,
          code: 'entertainment',
          icon: 'game-controller-outline',
          name: '娛樂',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 25,
          code: 'transport',
          icon: 'train-outline',
          name: '交通',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 35,
          code: 'life',
          icon: 'cafe-outline',
          name: '生活',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 45,
          code: 'other',
          icon: 'cash-outline',
          name: '其他',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
};
