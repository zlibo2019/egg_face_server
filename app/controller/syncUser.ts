'use strict';


import { Controller } from 'egg';
import { IResult } from '../extend/helper';
const fs = require('fs');
const path = require('path');

const mimeType = require('mime-types');  // 文件类型

/**
 * 下载人员
 */
class SyncUserController extends Controller {
    async create() {
        const { ctx } = this;
        let body = ctx.request.body;
        // @ts-ignore
        if (undefined !== ctx.request.files && ctx.request.files.length > 0) {
            // @ts-ignore
            const file = ctx.request.files[0];
            let filePath = path.resolve(file.filepath); // 原始文件地址
            let fileMimeType = mimeType.lookup(filePath); // 获取文件的 memeType

            if (!fileMimeType.toString().includes('image')) {
                ctx.logger.error(`Failed! ${filePath}:\tNot image file!`);
            }
            let data = fs.readFileSync(filePath);
            data = new Buffer(data).toString('base64');
            let base64 = 'data:' + fileMimeType + ';base64,' + data;


            let tmpBody = {};
            // @ts-ignore
            tmpBody.sid = body.sid;

            let payload = {};
            let params = {};
            // @ts-ignore
            params.sns = body.sns;
            let user = {};
            // @ts-ignore
            user.pin = body.user_id;
            // @ts-ignore
            user.identity_number = body.user_id;
            // @ts-ignore
            user.name = body.user_name;
            // @ts-ignore
            user.nation = body.user_nation;
            // @ts-ignore
            user.picture = base64;
            // @ts-ignore
            user.card_number = body.user_card; 
            // @ts-ignore
            user.birth = body.user_birthday;

            // @ts-ignore
            params.users = new Array();
            // @ts-ignore
            params.users.push(user);
            // @ts-ignore
            payload.params = params;
            // @ts-ignore
            tmpBody.payload = payload;
            body = tmpBody;
        }

        let jResult: IResult
            = {
            code: "00000000",
            message: '',
            result: null,
        };


        try {
            if (body.sid === 'icc.user.update') {
                jResult = await ctx.service.serviceUser.receiveAddUser(body);
            } else if (body.sid === 'icc.user.delete') {
                jResult = await ctx.service.serviceUser.receiveDeleteUser(body);
            }
            if ('00000001' === jResult.code) {
                ctx.failed(jResult);
                return;
            }
            ctx.success(jResult);
        } catch (err) {
            jResult.code = "00000001";
            jResult.message = err.stack;
            ctx.failed(jResult);
        }
    }
}

module.exports = SyncUserController;
