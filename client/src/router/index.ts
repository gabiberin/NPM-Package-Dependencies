import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import DependencyView from "../views/DependencyView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:packageName/:version",
    name: "Package Dependency Explorer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DependencyView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
