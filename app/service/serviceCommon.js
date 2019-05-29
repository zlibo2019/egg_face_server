const Service = require('egg').Service;
const moment = require('moment');

class CommonService extends Service {

  /**
   * # 获取全量人员
   */
  async getAllUser() {

    const { ctx, app } = this;
    let jResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    try {

      // let msg = {
      //   "chan": "1",
      //   "path": "D:\\zlb\\wwwroot\\frame\\421681507\\2019-05-22\\jk622600.jpg",
      //   "info": "aaaaaaaaaaaaaaaaaaa"
      // };


      // await this.app.emqtt.publish('', 'aaaaaaaaaaaaaaaaaaaaaaaaa', { qos: 1 });


      // 获取班级信息
      // const res = await ctx.curl(app.config.url.getClassIdByClassroomId, {
      //   method: 'GET',
      //   contentType: 'json',
      //   data: {},
      //   dataType: 'json',
      // });
      // if (res.status === 201 || res.data.code !== 600) {
      //   jResult.code = 601;
      //   jResult.msg = `外部接口(根据教室id获取班级id)错误：${res.data.msg}`;
      //   jResult.data = null;
      //   return jResult;
      // }

      // if (undefined !== arrUser && null !== arrUser) {
      //   jResult.data = arrUser.class_id;
      // } else {
      //   jResult.code = 601;
      //   jResult.msg = `外部接口(获取全量人员)错误:没有数据`;
      //   jResult.data = null;
      //   return jResult;
      // }
      // 清空
      let sql = 'delete from dt_user';
      let res = await ctx.model.query(sql);
      // 存储全量人员
      let arrUser = [
        { id: 100001, user_no: 'aaaaa', user_name: 'zs' },
        { id: 100002, user_no: 'bbbbb', user_name: 'ls' },
        { id: 100003, user_no: 'ccccc', user_name: 'ww' }
      ];
      res = await ctx.model.DtUser.bulkCreate(arrUser);
      // // 下发指令
      //     let cmd = {
      //       jtype:1,
      //       jint:1,
      //       jstr:'',
      //       jdev_id:0,
      //       jdev_bh:'1',
      //       jret_per:0,
      //       jret_subper:0,
      //       jret_int:0,
      //       jret_str:'0',
      //     }
      //     res = await ctx.model.JrealNowcmd.create(cmd);


      // 所有设备下发
      res = await ctx.model.StDevice.findAll();
      let arrUpdate1 = new Array();
      for (let i = 0; i < res.length; i++) {
        let curDeviceId = res[i].dataValues.dev_sb_id;
        let curUpdate1 = {
          jdev_id: curDeviceId,
          jdodata: 1073741824,
        }
        arrUpdate1.push(curUpdate1);
      }
      res = await ctx.model.JrealUpdate_1.bulkCreate(arrUpdate1);
      return jResult;
    }
    catch (err) {
      jResult.code = 601;
      jResult.msg = `外部接口(获取全量人员)错误：${err.stack}`;
      jResult.data = null;
      console.log(err.stack);
      return jResult;
    }
  };
}

module.exports = CommonService;