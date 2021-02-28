import { createWebHistory, createRouter } from 'vue-router';
import Races from '@/Views/Races.vue';
import Home from '@/Views/Home.vue';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/races',
      name: 'races',
      component: Races
    }
  ]
});

export default router;
