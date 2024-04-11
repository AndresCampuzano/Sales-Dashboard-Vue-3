import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '@/firebase/firebaseConfig'
import ProductsView from '@/views/ProductsView.vue'
import NewProductView from '@/views/NewProductView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'products',
          component: ProductsView
        },
        {
          path: 'new',
          name: 'new-product',
          component: NewProductView
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const remoteListener = onAuthStateChanged(
      FirebaseAuth,
      (user) => {
        resolve(user)
        remoteListener()
      },
      reject
    )
  })
}

router.beforeEach(async (to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
