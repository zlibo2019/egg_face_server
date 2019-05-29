
var mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://127.0.0.1',{
//     password: 'guest',
//     username: 'guest',
//     options: {
//       clean:false,
//       keepalive: 60,
//       protocolId: 'MQTT',
//       protocolVersion: 4,
//       reconnectPeriod: 1000,
//       connectTimeout: 30 * 1000,
//       rejectUnauthorized: true,
//     },
// })

// for (let index = 0; index < 10; index++) {
//     client.on('connect', function () {
//         console.log('aaaaaaaaaaaaaa');
//         client.subscribe('', function (err) {
//             if (!err) {
//                 client.publish('', 'Hello mqtt')
//             }
//         })
//     })
    
// }



// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log('hahahahaha'+message.toString())
//     client.end();
// })