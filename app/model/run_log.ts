/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;
  const run_log = app.model.define('run_log', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dev_serial: {
      type: STRING,
      allowNull: true
    },
    user_serial: {
      type: INTEGER,
      allowNull: true
    },
    in_out: {
      type: INTEGER,
      allowNull: true
    },
    user_id: {
      type: STRING,
      allowNull: true
    },
    user_name: {
      type: STRING,
      allowNull: true
    },
    info: {
      type: STRING,
      allowNull: true
    },
    sj: {
      type: STRING,
      allowNull: true
    },
    type: {
      type: INTEGER,
      allowNull: true
    },
  }, {
      tableName: 'run_log',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return run_log;
};
