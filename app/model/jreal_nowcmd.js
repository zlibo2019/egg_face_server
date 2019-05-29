/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize;
  const jreal_nowcmd = app.model.define('jreal_nowcmd', {   
    jcmdsig: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    jtype: {
      type: INTEGER,
      allowNull: false
    },
    jint: {
      type:INTEGER,
      allowNull: false
    },
    jstr: {
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
    jret_per: {
      type:INTEGER,
      allowNull: false
    },
    jret_subper: {
      type:INTEGER,
      allowNull: false
    },
    jret_int: {
      type:INTEGER,
      allowNull: false
    },
    jret_str: {
      type:STRING,
      allowNull: false
    },
  }, {
      tableName: 'jreal_nowcmd',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return jreal_nowcmd;
};
