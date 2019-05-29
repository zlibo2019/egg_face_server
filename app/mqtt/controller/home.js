'use strict';

const Controller = require('egg').Controller;


class HomeController extends Controller {

    async index() {

        /**
         * ctx.req = {
         *    topic: 'a',
         *    msg: 'xxxxxxxxxxxx',
         * }
         */

        console.log('sdffffffffffffffffff');
        console.log('xxxxxxx' + JSON.stringify(this.ctx.req));

        // publish
        // await this.app.emqtt.publish('', 'msg123456', { qos: 0 });
        // subscribe
    }

}

module.exports = HomeController;