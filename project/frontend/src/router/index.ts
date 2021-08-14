import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import AuthService from "@/services/authService";
import AppLayout from "@/components/AppLayout.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/signin",
    name: "Signin",
    component: Home,
  },
  {
    name: "Signup",
    path: "/signup",
    component: Home,
  },
  {
    path: "/",
    meta: {
      requiresAuth: true
    },
    component: AppLayout,
    children: [
      {
        path: "/configurations",
        meta: {
          requiresAuth: true,
        },
        name: "Configurations",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Configurations.vue"),
      },
      {
        path: "/configuration/:id",
        meta: {
          requiresAuth: true,
        },
        name: "Configuration",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Configuration.vue"),
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const recoverUserFromCookies = async (
  tokenData: string
): Promise<boolean> => {
  try {
    const userId = await AuthService.getUser();
    await store.dispatch("session/recoverLogin", {
      user: { id: userId },
      token: tokenData,
    });
    return true;
  } catch (err) {
    return false;
  }
};

router.beforeEach(async (to, from, next) => {
  const needAuth = to.matched.some((record) => record.meta.requiresAuth);
  const tokenData = AuthService.getTokenData() as string;
  const { user } = store.state.session;
  const shouldRecoverUser = tokenData && !user;
  if (user) {
    return next();
  }
  if (shouldRecoverUser) {
    const res = await recoverUserFromCookies(tokenData);
    if (res) {
      return next();
    } else {
      return next("/signin");
    }
  }
  if (needAuth) {
    //return next("/auth/signin");
    return next("/signin");
  } else {
    return next();
  }
});

export default router;
