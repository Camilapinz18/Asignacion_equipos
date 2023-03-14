import { createRouter, createWebHistory } from 'vue-router' 

const routes = [ 
  {
    path: '/',
    name: 'empleados', 
    component: () => import(/* webpackChunkName: "empleados" */ '../views/EmpleadosView.vue')
  },
  {
    path: '/marcas',
    name: 'marcas', 
    component: () => import(/* webpackChunkName: "empleados" */ '../views/MarcasView.vue')
  },
  {
    path: '/ref',
    name: 'ref', 
    component: () => import(/* webpackChunkName: "ref" */ '../views/RefView.vue')
  },
  {
    path: '/equipos',
    name: 'equipos', 
    component: () => import(/* webpackChunkName: "Equipos" */ '../views/EquiposView.vue')
  },
  {
    path: '/asignar',
    name: 'asignar', 
    component: () => import(/* webpackChunkName: "about" */ '../views/AsignacionView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
