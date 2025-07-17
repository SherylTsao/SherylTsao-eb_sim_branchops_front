// 📁 src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

// 使用者端元件
import LoginPage from '../views/LoginPage.vue'
import UserHome from '../views/UserHome.vue'
import BalanceInquiry from '../views/BalanceInquiry.vue'
import Transfer from '../views/Transfer.vue'
import TransactionHistory from '../views/TransactionHistory.vue'
import ChangePassword from '../views/ChangePassword.vue'
import AccountDetails from '../views/AccountDetails.vue'
import CustomerProfile from '../views/CustomerProfile.vue'

// 管理端元件
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminHome from '../views/admin/AdminHome.vue'
import UserManagement from '../views/admin/UserManagement.vue'
import TransactionMonitor from '../views/admin/TransactionMonitor.vue'
import SystemSettings from '../views/admin/SystemSettings.vue'
import ReviewApproval from '../views/admin/ReviewApproval.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/home', component: UserHome },
  { path: '/balance', component: BalanceInquiry },
  { path: '/transfer', component: Transfer },
  { path: '/transactions', component: TransactionHistory },
  { path: '/change-password', component: ChangePassword },
  { path: '/account/:accNo', component: AccountDetails },
  { path: '/customer/:idNumber', component: CustomerProfile },
  { path: '/admin/login', component: AdminLogin },
  { path: '/admin/home', component: AdminHome },
  { path: '/admin/users', component: UserManagement },
  { path: '/admin/transactions', component: TransactionMonitor },
  { path: '/admin/settings', component: SystemSettings },
  { path: '/admin/review', component: ReviewApproval },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
