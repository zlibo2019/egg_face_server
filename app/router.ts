import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.resources('syncUser', '/kaocher/sycPersonsForYunan', controller.syncUser); 
  // router.post('/kaocher/sycPersonsForYunan', controller.user.down);     // 设备档案
};
