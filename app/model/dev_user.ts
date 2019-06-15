/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;
  const dev_user = app.model.define('dev_user', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dev_id: {
      type: STRING,
      allowNull: true
    },
    user_id: {
      type: STRING,
      allowNull: true
    }
  }, {
      tableName: 'dev_user',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return dev_user;
};
