import { Service } from 'egg';
import { IResult } from '../extend/helper';
const moment = require('moment');

export default class ConsumerService extends Service {


    // ctx.service.consumer
    async resoveRecord(redisKeyHead, photoPath) {

        const { ctx, app } = this;
        let jResult: IResult
            = {
            code: "00000000",
            message: '',
            result: null
        };

        try {
            // let devId = ctx.service.serviceUser.getDevIdFromPath(photoPath);
            let sRecord = await app.redis.get(`${redisKeyHead}_record`);
            app.redis.del(`${redisKeyHead}_record`);
            app.redis.del(`${redisKeyHead}_photo`);
            if (undefined !== sRecord && null !== sRecord) {
                let record = JSON.parse(sRecord);
                let arrField = record.inStr.split(",");
                // let photoName = arrField[6];
                let dev_id = arrField[7];
                let outInt = Number(arrField[3]) - 1;
                let id = Number(arrField[0]);
                let date = arrField[1];
                jResult = await ctx.service.serviceUser.postRecord(dev_id, outInt, id, date, photoPath);
                if (jResult.code !== '00000000') {
                    console.log(jResult.message);
                } else {
                    console.log(`${dev_id}记录上传成功!`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    // ctx.service.consumer
    async consumer(topic, payload) {

        const { ctx, app } = this;
        // let jResult: IResult
        //     = {
        //     code: "00000000",
        //     message: '',
        //     result: null
        // };
        topic;

        try {

            console.log('mq info:.....................' + JSON.stringify(payload));
            // 记录
            if (undefined !== payload.inStr) {

                let arrField = payload.inStr.split(",");
                let day = moment(arrField[1]).format("YYYY-MM-DD");
                let photoName = `${arrField[6]}.jpg`;
                let devId = arrField[7];

                let redisKeyHead = `dev_${devId}_${day}_${photoName}`;
                await app.redis.set(`${redisKeyHead}_record`, JSON.stringify(payload));


                let photoPath = await app.redis.get(`${redisKeyHead}_photo`);
                // let photoPath =await app.redis.get(`aaaa`);
                if (undefined !== photoPath && null !== photoPath) {
                    this.resoveRecord(redisKeyHead, photoPath);
                };
            }
            // 记录照片
            else if (undefined !== payload.path) {
                let photoPath = payload.path;
                let res = ctx.service.serviceUser.getDevInforFromPath(photoPath);
                // @ts-ignore
                let redisKeyHead = `dev_${res.devId}_${res.day}_${res.photoName}`;
                await app.redis.set(`${redisKeyHead}_photo`, photoPath);
                let record = await app.redis.get(`${redisKeyHead}_record`);
                if (undefined !== record && null !== record) {
                    this.resoveRecord(redisKeyHead, photoPath);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
