import { Service } from 'egg';
import { IResult } from '../extend/helper';
const moment = require('moment');
const fs = require("fs");
const path = require('path');


export default class UserService extends Service {

  /**
   * # 读照片文件返回base64
   */
  async readPhotofile(photoPath) {
    const { ctx } = this;
    let base64 = '';
    // 保存照片
    await new Promise((resolve, reject) => {
      // @ts-check
      fs.readFile(photoPath, function (err, data) {
        if (err) {
          reject(err);
          ctx.logger.error(err);
        }
        else {

          base64 = data.toString("base64");
          // console.log('success:' + base64);
          resolve();
        }
      });
    })
    return base64;
  }


  /**
  * # 上传记录
  */
  async postRecord(dev_id, outInt, id, date, photoPath) {

    const { ctx, app } = this;
    let jResult: IResult
      = {
      code: "00000000",
      message: '',
      result: null
    };
    try {
      // console.log('sssssssssssss' + JSON.stringify(record));
      // let arrField = record.inStr.split(",");
      // let photoName = arrField[6];
      // let dev_id = arrField[7];
      // let outInt = Number(arrField[3]) - 1;
      // let id = Number(arrField[0]);
      let res = await this.getUserIdById(id);
      let pin = '0';
      if ('00000001' !== res.code) {
        pin = res.result[0].user_id;
      }
      // let sDate = moment().format("YYYY-MM-DD")
      // let root = path.resolve(__dirname, '..');
      // root = path.resolve(root, '..');
      // let photoPath = `${root}\\record_photo\\${dev_id}\\${date}\\${photoName}.jpg`;

      // let photoPath = `c:/record_photo/${dev_id}/${sDate}/${photoName}.jpg`;
      let base64 = '';

      // console.log('photo path:' + photoPath);
      base64 = await this.readPhotofile(photoPath);
      if ('' === base64) {
        jResult.code = "00000001";
        jResult.message = 'get photo fail' + photoPath;
        return jResult;
      }

      let log = {
        date: date, //arrField[1],
        verify_type: 4096,
        pin: pin,
        io_flag: outInt,
        picture: base64,
        status: 0
      }
      let postData = {};
      // @ts-ignore
      postData.sn = dev_id;
      // @ts-ignore
      postData.sid = `device.data.upload.checklog`;
      let params = {};
      // @ts-ignore
      params.logs = [log];
      let payload = {};
      // @ts-ignore
      payload.params = params;
      // @ts-ignore
      postData.payload = payload;

      // console.log('post data:' + JSON.stringify(postData));

      // 获取班级信息
      res = await ctx.curl(`${app.config.info.connectIp}/admin/identityAuth/postPeopleInfo`, {
        method: 'POST',
        contentType: 'json',
        data: postData,
        dataType: 'json',
      });

      // @ts-ignore
      if (undefined === res.data || res.data.code === '00000001') {
        jResult.code = '00000001';
        jResult.message = `提交记录错误：${res.message}`;
        jResult.result = null;
        return jResult;
      }
      return jResult;
    } catch (err) {
      jResult.code = '00000001';
      jResult.message = `${err.stack}`;
      jResult.result = null;
      return jResult;
    }
  }


  // function readPhotofile(photoPath) {
  //     setTimeout(() => {
  //       let sResult =  _readPhotofile(photoPath);
  //       if (sResult === ''){
  //           readPhotofile(photoPath);
  //       }
  //     }, 100);
  // }

  /**
   * # 根据id取身份证号
   */
  async getUserIdById(id) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: "00000000",
      message: '',
      result: null
    };
    try {
      let sql = `select user_id from dt_user where id = ${id}`;
      let arrUser = await ctx.model.query(sql, {
        type: ctx.model.QueryTypes.SELECT,
      });

      jResult.result = arrUser;
      return jResult;
    } catch (err) {
      jResult.code = "00000001";
      jResult.message = `${err.stack}`;
      jResult.result = null;
      return jResult;
    }
  }


  /**
   * # 根据身份证号取id
   */
  async getIdByUserId(userId) {

    const { ctx } = this;
    let jResult: IResult
      = {
      code: "00000000",
      message: '',
      result: null
    };
    try {
      let sql = `select id from dt_user where user_id = '${userId}'`;
      let arrUser = await ctx.model.query(sql, {
        type: ctx.model.QueryTypes.SELECT,
      });

      jResult.result = arrUser;
      return jResult;
    } catch (err) {
      jResult.code = "00000001";
      jResult.message = `${err.stack}`;
      jResult.result = null;
      return jResult;
    }
  }

  /**
   * # 解析路径取设备id
   */
  getDevInforFromPath(photoPath) {
    let arrDir = photoPath.split("\\");
    let len = arrDir.length;
    let res = {};
    // @ts-ignore
    res.devId = arrDir[len - 3];
    // @ts-ignore
    res.day = arrDir[len - 2];
    // @ts-ignore
    res.photoName = arrDir[len - 1];
    return res;
  }






  /**
   * # 设备新增档案
   */
  async  receiveAddUser(body) {
    const { ctx } = this;
    let dev_ids = body.payload.params.sns;
    let arrDev = dev_ids.split(",");
    let arrUser = body.payload.params.users;
    let jResult: IResult
      = {
      code: "00000000",
      message: '',
      result: null
    };
    try {


      // 更新人员

      // console.log('人员数目：' + arrUser.length.toString());

      for (let i = 0; i < arrUser.length; i++) {
        let userId = arrUser[i].identity_number;
        let imgData = arrUser[i].picture;
        let root = path.resolve(__dirname, '..');
        root = path.resolve(root, '..');
        let id = 0;

        // 更新人员档案

        let userName = arrUser[i].name;
        let userNo = arrUser[i].pin;


        let user = await ctx.model.DtUser.findOne({
          where: {
            user_id: userId,
          }
        });
        if (undefined !== user && null !== user) {
          id = user.id;
          // 有则更新
          await ctx.model.DtUser.update({
            user_no: userNo,
            user_name: userName,
          }, {
              where: {
                user_id: userId,
              }
            })
        } else {
          user = await ctx.model.DtUser.create({
            user_id: userId,
            user_no: userNo,
            user_name: userName,
          })
          id = user.id;
        }




        if (user.id === 0) {
          let res = await this.getIdByUserId(userId);
          if ('00000001' !== res.code && res.result.length > 0) {
            id = res.result[0].id;
          }
        }
        let dir = (Math.floor(id / 1000));
        let photoPath = `${root}\\photo\\${dir}`;
        let fileName = `${photoPath}\\${id}.jpg`;


        // 创建目录 
        if (!fs.existsSync(photoPath)) {
          fs.mkdirSync(photoPath, { recursive: true });
        };

        // 保存照片
        await new Promise((resolve, reject) => {
          var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
          var dataBuffer = Buffer.from(base64Data, 'base64');
          fs.writeFile(fileName, dataBuffer, function (err) {
            if (err) {
              reject(err);
            }
            resolve();
          });
        })
      }



      // 设置白名单、下发增量

      for (let i = 0; i < arrDev.length; i++) {
        let curDev = arrDev[i];
        ctx.logger.info(
          `${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")} 设备 
           ${curDev} 收到同步人员请求,人员数目 ${JSON.stringify(arrUser.length)}`);
        for (let j = 0; j < arrUser.length; j++) {
          // console.log('人员:' + JSON.stringify(arrUser[j]));
          let userId = arrUser[j].identity_number;
          // @ts-ignore
          let devUser = await ctx.model.DevUser.findOne({
            where: {
              dev_id: curDev,
              user_id: userId,
            }
          });
          if (undefined === devUser || null === devUser) {
            // @ts-ignore
            devUser = await ctx.model.DevUser.create({
              user_id: userId,
              dev_id: curDev,
            })
          }

          let res = await this.getIdByUserId(userId);
          let id = 0;
          if ('00000001' !== res.code && res.result.length > 0) {
            id = res.result[0].id;
          } else {
            return res;
          }

          // 下发增量 
          let userNo = arrUser[j].pin;
          let userName = arrUser[j].name;
          let userCard = arrUser[j].card_number;
          let userBirthday = arrUser[j].birth;
          let str = `1,1,${id},${userNo},${userName},${userCard},0000000000,1,123456,${userBirthday},0,4`;

          let jrealUpdate_1 = {
            jdev_id: curDev,
            jdev_bh: '0000000',
            juser_id: id,
            jdodata: 134217728,
            jdata_str: str
          };
          await ctx.model.JrealUpdate_1.create(jrealUpdate_1);
          ctx.logger.info(`${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}设备${curDev}同步人员成功:${userName}`);
        }
      }

      return jResult;
    } catch (err) {
      jResult.code = "00000001";
      jResult.message = `${err.stack} `;
      jResult.result = null;
      return jResult;
    }
  }



  /**
   * # 设备删除档案
   */
  async receiveDeleteUser(body) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: "00000000",
      message: '',
      result: null
    };

    let devId = body.payload.params.sns;
    let arrUserId = body.payload.params.pins;


    ctx.logger.info(`删除设备${devId}的人员:共 ${arrUserId.length}人`);

    try {

      // 下发增量
      for (let j = 0; j < arrUserId.length; j++) {
        let userId = arrUserId[j];
        // 删除设备人员关系 
        // @ts-ignore
        await ctx.model.DevUser.destroy({
          where: {
            dev_id: devId,
            user_id: userId,
          }
        });


        let res = await this.getIdByUserId(userId);
        let id = 0;
        if ('00000001' !== res.code && res.result.length > 0) {
          id = res.result[0].id;
        } else {
          ctx.logger.info(`未找到人员id,user_id: ${userId}`);
          continue;
        }
        // 下发增量 

        let str = `1, 3, ${id} `;
        let jrealUpdate1 = {
          jdev_id: devId,
          juser_id: id,
          jdata_str: str
        };
        await ctx.model.JrealUpdate_1.create(jrealUpdate1);
      }
      ctx.logger.info(`删除人员结果: ${JSON.stringify(jResult)}`);
      return jResult;
    } catch (err) {
      jResult.code = "00000001";
      jResult.message = `${err.stack} `;
      jResult.result = null;
      ctx.logger.error(`删除人员结果: ${JSON.stringify(jResult)}`);
      return jResult;
    }
  }
}

