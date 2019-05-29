/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE
  } = app.Sequelize;
  const dt_user = app.model.define('dt_user', {   
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    user_no: {
      type: STRING,
      allowNull: true
    },
    user_name: {
      type: STRING,
      allowNull: true
    },
    user_sex: {
      type: INTEGER,
      allowNull: true
    },
  }, {
      tableName: 'dt_user',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return dt_user;
};
