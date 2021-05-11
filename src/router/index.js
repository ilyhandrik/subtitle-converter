import Vue from 'vue';
import VueRouter from 'vue-router';
import MainTable from '@/components/MainTable.vue';
import ActorsListView from '@/views/ActorsListView.vue';
import TimeCalcView from '@/views/TimeCalcView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainTable,
  },
  {
    path: '/actors',
    name: 'Actors',
    component: ActorsListView,
  },
  {
    path: '/time',
    name: 'Time',
    component: TimeCalcView,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
