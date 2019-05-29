exports.schedule = {
    type: 'worker',
    immediate: true,
};
const moment = require('moment');
// 获取增量人员
function getAllUser(ctx) {
    const interval = 5000;
    setTimeout(async () => {
        let jResult = await ctx.service.serviceCommon.getAllUser();
        getAllUser(ctx);
    }, interval);
};

exports.task = async function (ctx) {
    getAllUser(ctx);
};