import Vue from "vue";
import Router from "vue-router";
import NProgress from 'nprogress'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import('@/components/Header/Index'),
      children: [
        {
          path: "/StartIndex",
          name: "StartIndex",
          component: () => import('@/components/StartReview/StartIndex'),
          children: [
            {
              path: "/ReviewRecord",
              name: "ReviewRecord",
              component: () => import('@/components/StartReview/StartRecord')
            }
          ]
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
      NProgress.start();
      next()
  });
  
  router.afterEach(transition => {
    NProgress.done();
  });
export default router;
