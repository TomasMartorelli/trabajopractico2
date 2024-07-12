import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import MoviesView from '@/views/MoviesView.vue' // Importa la vista de películas

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'UsuariosView',
      component: UsuariosView
    },
    {
      path: '/movies/:username', // Ruta para la vista de películas con parámetro username
      name: 'MoviesView',
      component: MoviesView
    }
  ]
})

export default router
