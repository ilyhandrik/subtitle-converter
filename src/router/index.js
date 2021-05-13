import Vue from 'vue';
import VueRouter from 'vue-router';
import MainTableView from '@/views/MainTableView.vue';
import ActorsListView from '@/views/ActorsListView.vue';
import TimeCalcView from '@/views/TimeCalcView.vue';
import ProjectListEditorView from '@/views/ProjectListEditorView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'MainTable',
    component: MainTableView,
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
    path: '/projects',
    name: 'Projects',
    component: ProjectListEditorView,
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
