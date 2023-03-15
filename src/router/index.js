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
            /* webpageChunkName:"FetchTweets"*/ "@/components/FetchTweets.vue"
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
  console.log("user", user);
  // if (to.meta.auth) {
  //   if (user && user?.token) {
  //     next();
  //   } else {
  //     next({ name: ROUTES_CONSTANTS.SIGNUP_PAGE });
  //   }
  // } else if (
  //   (to.name === ROUTES_CONSTANTS.SIGNUP_PAGE ||
  //     to.name === ROUTES_CONSTANTS.LOGIN_PAGE) &&
  //   user
  // ) {
  //   next({ name: ROUTES_CONSTANTS.HOME_PAGE });
  // } else {
  //   next();
  // }
  next();
});

export default router;
