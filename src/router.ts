import { createWebHistory, createRouter } from 'vue-router';
import Races from '@/Views/Races.vue';
import Home from '@/Views/Home.vue';
import Register from '@/Views/Register.vue';
import Login from '@/Views/Login.vue';

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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

export default router;
