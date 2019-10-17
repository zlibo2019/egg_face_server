import { Service } from 'egg';
import { IResult } from '../extend/helper';
const moment = require('moment');

export default class ConsumerService extends Service {


    // type 1 新增档案 3删除档案 4记录 5 模板文件缺失 6入库失败 10 批量日志
    async insertLog(type,userId, devSerial, inOut, info) {

        const { ctx } = this;
        let jResult: IResult
            = {
            code: "00000000",
            message: '',
            result: null
        };

        try {
            await ctx.model.RunLog.create({
                // user_serial: userSerial,
                type:type,
                user_id: userId,
                dev_serial: devSerial,
                // user_name: userName,
                in_out: inOut,
                info: info,
                sj: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            })
        } catch (error) {
            jResult.code = '00000001';
            jResult.message = error;
            ctx.logger.error(error);
        }
        return jResult;
    }
}
