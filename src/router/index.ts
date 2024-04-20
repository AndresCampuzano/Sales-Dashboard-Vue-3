import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '@/firebase/firebaseConfig'
import ProductsView from '@/views/ProductsView.vue'
import ProductFormView from '@/views/ProductFormView.vue'
import CustomersView from '@/views/CustomersView.vue'
import CustomerFormView from '@/views/CustomerFormView.vue'
import ExpensesView from '@/views/ExpensesView.vue'
import ExpenseFormView from '@/views/ExpenseFormView.vue'
import SaleForm from '@/views/SaleForm.vue'

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
      path: '/sales',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'new',
          name: 'new-sale',
          component: SaleForm
        }
      ]
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
          component: ProductFormView
        },
        {
          path: 'edit/:id',
          name: 'edit-product',
          component: ProductFormView
        }
      ]
    },
    {
      path: '/customers',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'customers',
          component: CustomersView
        },
        {
          path: 'new',
          name: 'new-customer',
          component: CustomerFormView
        },
        {
          path: 'edit/:id',
          name: 'edit-customer',
          component: CustomerFormView
        }
      ]
    },
    {
      path: '/expenses',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'expenses',
          component: ExpensesView
        },
        {
          path: 'new',
          name: 'new-expense',
          component: ExpenseFormView
        },
        {
          path: 'edit/:id',
          name: 'edit-expense',
          component: ExpenseFormView
        }
      ]
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
