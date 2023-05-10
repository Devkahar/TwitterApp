import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES_CONSTANTS } from "@/helper/constants";
import store from "@/store";
import MainLayout from "@/Layouts/MainLayout.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: ROUTES_CONSTANTS.HOME_PAGE,
    component: () =>
      import(/* webpageChunkName:"HomePage"*/ "@/views/HomeView.vue"),
    meta: {
      layout: MainLayout,
    },
  },
  {
    path: "/signup",
    name: ROUTES_CONSTANTS.SIGNUP_PAGE,
    component: () =>
      import(/* webpageChunkName:"SignUpPage"*/ "@/views/SignupView.vue"),
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/login",
    name: ROUTES_CONSTANTS.LOGIN_PAGE,
    component: () =>
      import(/* webpageChunkName:"LoginPage"*/ "@/views/LoginView.vue"),
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/user/:userId",
    name: ROUTES_CONSTANTS.USER_PAGE,
    component: () =>
      import(/* webpageChunkName:"UserView"*/ "@/views/UserView.vue"),
    meta: {
      layout: MainLayout,
    },
    props: true,
  },
  {
    path: "/edit/profile",
    name: ROUTES_CONSTANTS.EDIT_PAGE,
    component: () =>
      import(/* webpageChunkName:"UserView"*/ "@/views/EditprofileView.vue"),
    meta: {
      layout: AuthLayout,
    },
    props: true,
  },
  {
    path: "/edit/password",
    name: ROUTES_CONSTANTS.EDIT_PASSWORD_PAGE,
    component: () =>
      import(/* webpageChunkName:"UserView"*/ "@/views/ChangepasswordView.vue"),
    meta: {
      layout: AuthLayout,
    },
    props: true,
  },
  {
    path: "*",
    name: ROUTES_CONSTANTS.PAGE_NOT_FOUND,
    component: () =>
      import(/* webpageChunkName:"UserView"*/ "@/views/NotfoundView.vue"),
    meta: {
      layout: MainLayout,
    },
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.getters.isUserAuth;
  if (
    user &&
    (to.name === ROUTES_CONSTANTS.SIGNUP_PAGE ||
      to.name === ROUTES_CONSTANTS.LOGIN_PAGE)
  ) {
    next({ name: ROUTES_CONSTANTS.HOME_PAGE });
  }
  if (
    !user &&
    (to.name === ROUTES_CONSTANTS.EDIT_PAGE ||
      to.name === ROUTES_CONSTANTS.EDIT_PASSWORD_PAGE)
  ) {
    next({ name: ROUTES_CONSTANTS.HOME_PAGE });
  } else {
    next();
  }
});

export default router;