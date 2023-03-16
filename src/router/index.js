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
      guest: true,
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
    path: "/login",
    name: ROUTES_CONSTANTS.LOGIN_PAGE,
    component: () =>
      import(/* webpageChunkName:"LoginPage"*/ "@/views/LoginView.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/user/:userId",
    name: ROUTES_CONSTANTS.USER_PAGE,
    component: () =>
      import(/* webpageChunkName:"UserView"*/ "@/views/UserView.vue"),
    meta: {
      guest: true,
    },
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.getters.isUserAuth;
  console.log("user", user);
  if (
    user &&
    (to.name === ROUTES_CONSTANTS.SIGNUP_PAGE ||
      to.name === ROUTES_CONSTANTS.LOGIN_PAGE)
  ) {
    next({ name: ROUTES_CONSTANTS.HOME_PAGE });
  } else {
    next();
  }
});

export default router;
