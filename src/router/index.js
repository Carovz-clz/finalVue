import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Inicio
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
  },
  {
    path: '/clasificacion',
    name: 'Clasificacion',
    component: () => import ('../views/Clasificacion.vue')
  },
  {
    path: '/jornadas',
    name: 'Jornadas',
    component: () => import ('../views/Jornadas.vue')
  },
  {
    path: '/nuevopartido',
    name: 'NuevoPartido',
    component: () => import ('../views/NuevoPartido.vue')
  },
  {
    path: '/equipos',
    name: 'Equipos',
    component: () => import ('../views/Equipos.vue')
  },
  {
    path: '/jugadores',
    name: 'Jugadores',
    component: () => import ('../views/Jugadores.vue')
  },
  {
    path: '/nuevojugador',
    name: 'NuevoJugador',
    component: () => import ('../views/NuevoJugador.vue')
  },
  {
    path: '/eliminarjugador',
    name: 'EliminarJugador',
    component: () => import ('../views/EliminarJugador.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
