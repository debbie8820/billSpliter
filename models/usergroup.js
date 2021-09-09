'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGroup.belongsTo(models.User)
      UserGroup.belongsTo(models.Group)
    }
  };
  UserGroup.init({
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGroup',
  });
  return UserGroup;
};