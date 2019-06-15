import { Service } from 'egg';
import { IResult } from '../extend/helper';

export default class ConsumerService extends Service {

    // ctx.service.consumer
    async consumer(topic, payload) {

        const { ctx, app } = this;
        let jResult: IResult
            = {
            code: "00000000",
            message: '',
            result: null
        };
        topic;

        try {
            console.log(payload.toString());
            // 记录
            if (undefined !== payload.inStr) {
                // let sRecord = sData;
                let arrField = payload.inStr.split(",");
                let devId = arrField[7];
                // @ts-ignore
                await app.redis.set(`dev_${devId}`, JSON.stringify(payload));
            }
            // 记录照片
            else if (undefined !== payload.path) {
                let photoPath = payload.path;
                let devId = ctx.service.serviceUser.getDevIdFromPath(photoPath);
                // @ts-ignore
                let sRecord = await app.redis.get(`dev_${devId}`);
                if (undefined !== sRecord && null !== sRecord) {
                    let record = JSON.parse(sRecord);
                    jResult = await ctx.service.serviceUser.postRecord(record);
                    if (jResult.code !== '00000000') {
                        console.log(jResult.message);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
