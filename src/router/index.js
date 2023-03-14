import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES_CONSTANTS } from "@/helper/constants";
import store from "@/store";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: ROUTES_CONSTANTS.HOME_PAGE,
    component: () =>
      import(/* webpageChunkName:"HomePage"*/ "@/views/HomeView.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/signup",
    name: ROUTES_CONSTANTS.SIGNUP_PAGE,
    component: () =>
      import(/* webpageChunkName:"SignUpPage"*/ "@/views/SignupView.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/:userId",
    name: ROUTES_CONSTANTS.USER_PAGE,
    component: () =>
      import(/* webpageChunkName:"UserView"*/ "@/views/UserView.vue"),
    meta: {
      guest: true,
    },
    props: true,
    children: [
      {
        path: ":tab",
        component: () =>
          import(
            /* webpageChunkName:"FetchTweets"*/ "@/component/FetchTweets.vue"
          ),
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.state.userInfo;
  if (to.meta.auth) {
    if (user && user.token) {
      next();
    } else {
      next({ name: ROUTES_CONSTANTS.SIGNUP_PAGE });
    }
  } else if (to.name === ROUTES_CONSTANTS.SIGNUP_PAGE && user) {
    next({ name: ROUTES_CONSTANTS.HOME_PAGE });
  } else {
    next();
  }
});

export default router;
