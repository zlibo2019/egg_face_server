'use strict'

module.exports = appInfo => {

  const config = (exports = {})
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539827119432_6100'

  // add your config here
  config.middleware = []
  //数据库配置
  config.sequelize = {
    dialect: 'mysql',
    // pool: {
    //   max: 100,
    //   min: 20,
    //   idle: 10000
    // },
    host: '127.0.0.1',
    username: 'root',
    password: '',
    // driver: 'tedious',
    port: 3306,
    database: 'scm_main',
    logging: false,
  }

  config.emqtt = {
    client: {
      host: 'mqtt://127.0.0.1',
      password: 'guest',
      username: 'guest',
      clientId: 'egg_zlb',
      options: {
        clean:false,
        keepalive: 60,
        protocolId: 'MQTT',
        protocolVersion: 4,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
  //      rejectUnauthorized: true,
      },
      msgMiddleware: [ 'msg2json' ],
    },
  }

  // exports.alinode = {
  //   enable: true,
  //   server: 'wss://agentserver.node.aliyun.com:8080',
  //   appid: '79708',
  //   secret: 'ada717f1f997acb2c3815528270af4eb94075de9',
  //   logdir: '/tmp/',  // Node.js 性能平台日志输出地址绝对路径，与 NODE_LOG_DIR 保持一致。如：/tmp/，也可以不写
  //   // error_log: [
  //   //   // '您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
  //   //   // '例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
  //   //   // '不更改 Egg 默认日志输出路径可不配置本项目',
  //   // ],
  //   // agentidMode: 'IP',  // 可选，如果设置，则在实例ID中添加部分IP信息，用于多个实例 hostname 相同的场景（以容器为主）
  // };

  // config.cluster = {
  //   listen: {
  //     port: 8087,
  //     // hostname: '127.0.0.1',
  //   }
  // }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }


  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };


  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
    fileExtensions: ['.xlsx'], // 增加对 xlsx 扩展名的文件支持
  };


  // config.httpclient = {
  //   // @ts-ignore
  //   request: {
  //     timeout: 600000,
  //   },
  //   httpAgent: {
  //     keepAlive: true,
  //     freeSocketTimeout: 4000,
  //     maxSockets: Number.MAX_SAFE_INTEGER,
  //     maxFreeSockets: 256,
  //   },
  //   httpsAgent: {
  //     keepAlive: true,
  //     freeSocketTimeout: 4000,
  //     maxSockets: Number.MAX_SAFE_INTEGER,
  //     maxFreeSockets: 256,
  //   },
  // };


  // config.redis = {
  //   client: {
  //     port: 6379,
  //     host: '127.0.0.1',
  //     password: '',
  //     db: 1,
  //   },
  // };


  exports.logger = {
    // level: 'NONE',
    consoleLevel: 'INFO',
  };



  config.project = {
    server: 'http://10.1.0.6:53059/',
    system: 'd://aa//',
    maxConCurrentPerDev: 10,   //每台设备最大并发数
    position: 17800,
  };


  return config;
}
