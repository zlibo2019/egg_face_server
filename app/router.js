module.exports = app => {
  const { router } = app;
  router.get('/', app.mqtt.controller.home.index);

  // mqtt_client,subscribe topic: a
 app.emqtt.route('#', app.mqtt.controller.home.index);
};
