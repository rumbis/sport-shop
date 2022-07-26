import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ShopView from '../views/ShopView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import AdminView from '../views/admin/AdminView.vue'
import OrdersAdminView from '../views/admin/OrdersAdminView.vue'
import ProductsAdminView from '../views/admin/ProductsAdminView.vue'
import CategoriesAdminView from '../views/admin/CategoriesAdminView.vue'
import UsersAdminView from '../views/admin/UsersAdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/shop/:path',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/products/:id',
    name: "productdetail",
    component: ProductDetailView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/orders',
    name: 'admin-orders',
    component: OrdersAdminView
  },
  {
    path: '/admin/products',
    name: 'admin-products',
    component: ProductsAdminView
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: CategoriesAdminView
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: UsersAdminView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
