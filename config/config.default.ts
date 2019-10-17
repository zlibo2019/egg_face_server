import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545281209678_6598';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      enable: false,
    }
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'scm_main',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    logging: true,
  };

  config.multipart = {
    mode: 'file',
    fileExtensions: ['.jpeg', '.jpg', '.png'], // 增加对 扩展名的文件支持
  };


  config.mq = {
    rabbitmq: {
      address: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest'
    },
    producers: [
      {
        exchange: "amq.topic",
        exchangeType: "topic"
      }
    ],
    consumers: [
      {
        exchange: "amq.topic",
        exchangeType: "topic",
        ack: true,
        queue: "face",
        topic: "#",
        consumer: "serviceConsume.consumer"
      }
    ],
  };


  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 1,
    },
  };




  config.bodyParser = {
    jsonLimit: '50mb',
    formLimit: '50mb',
  };

  config.httpclient = {
    // @ts-ignore
    request: {
      timeout: 600000,
    },
    httpAgent: {
      keepAlive: true,
      freeSocketTimeout: 4000,
      maxSockets: Number.MAX_SAFE_INTEGER,
      maxFreeSockets: 256,
    },
    httpsAgent: {
      keepAlive: true,
      freeSocketTimeout: 4000,
      maxSockets: Number.MAX_SAFE_INTEGER,
      maxFreeSockets: 256,
    },
  };

  config.cluster = {
    listen: {
      port: 15006,
      // hostname: '127.0.0.1',
    }
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.info = {
    connectIp: "http://116.249.5.18:82",
  };


  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
