/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE
  } = app.Sequelize;
  const st_device = app.model.define('st_device', {   
    bh: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    dev_sb_id: {
      type:INTEGER,
      allowNull: true
    },
  }, {
      tableName: 'st_device',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return st_device;
};
