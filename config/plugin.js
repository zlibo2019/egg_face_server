'use strict'

// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.emqtt = {
  enable: true,
  package: 'egg-emqtt',
}

// exports.redis= {
//   enable: true,
//   package: 'egg-redis',
// }

exports.security = {
  enable: false
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

// exports.alinode = {
//   enable: true,
//   package: 'egg-alinode',
// };
