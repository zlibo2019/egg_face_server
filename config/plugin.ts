import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mq: {
    enable: true,
    package: 'egg-mq',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  }

};

export default plugin;
