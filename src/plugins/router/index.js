import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
 const token = localStorage.getItem('auth_token')

  const isTokenValid = token && token !== 'null' && token !== 'undefined'

  if (to.meta.requiresAuth && !isTokenValid) {
    return next({ path: '/login' })
  }

  if ((to.path === '/login' || to.path === '/register') && isTokenValid) {
    return next('/dashboard')
  }


  next()
})

// ✅ Export for plugin registration
export default function (app) {
  app.use(router)
}

// ✅ Export router instance for manual use
export { router }
