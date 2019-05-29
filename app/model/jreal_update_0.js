/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;
  const jreal_update_0 = app.model.define('jreal_update_0', {   
    jsig: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    jdodata: {
      type: INTEGER,
      allowNull: false
    },
    juser_id: {
      type:INTEGER,
      allowNull: false
    },
    jdata_str: {
      type:STRING,
      allowNull: false
    },
    jdev_id: {
      type:INTEGER,
      allowNull: false
    },
    jdev_bh: {
      type:STRING,
      allowNull: false
    },
    jext_type: {
      type:INTEGER,
      allowNull: false
    },
    jtime: {
      type:DATE,
      allowNull: true
    },
    joperator: {
      type:STRING,
      allowNull: true
    },
    jip_addr: {
      type:STRING,
      allowNull: true
    },
  }, {
      tableName: 'jreal_update_0',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return jreal_update_0;
};
