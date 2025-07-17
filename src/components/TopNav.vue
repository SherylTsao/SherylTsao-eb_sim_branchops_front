<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isAdmin = computed(() => route.path.startsWith('/admin'))

const isLoggedIn = computed(() => {
  return isAdmin.value
    ? !!localStorage.getItem('adminToken')
    : !!localStorage.getItem('token')
})

const logout = () => {
  if (isAdmin.value) {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  } else {
    localStorage.removeItem('token')
    router.push('/login')
  }
}
</script>

<template>
  <nav class="top-nav">
    <div v-if="isLoggedIn">
      <div v-if="isAdmin" class="nav-logged-in">
        <div class="left-section">
          <div class="logo">🏢 管理後台</div>
          <ul class="nav-links">
            <li><router-link to="/admin/home">首頁</router-link></li>
            <li><router-link to="/admin/users">使用者管理</router-link></li>
            <li><router-link to="/admin/transactions">交易監控</router-link></li>
            <li><router-link to="/admin/settings">系統設定</router-link></li>
            <li><router-link to="/admin/review">審核管理</router-link></li>
          </ul>
        </div>
        <div class="right-section">
          <span class="greeting">您好，管理員</span>
          <button @click="logout">登出</button>
        </div>
      </div>

      <div v-else class="nav-logged-in">
        <div class="left-section">
          <div class="logo">🏦 SBANK</div>
          <ul class="nav-links">
            <li><router-link to="/home">首頁</router-link></li>
            <li><router-link to="/balance">查詢餘額</router-link></li>
            <li><router-link to="/transfer">轉帳</router-link></li>
            <li><router-link to="/transactions">交易紀錄</router-link></li>
            <li><router-link to="/change-password">修改密碼</router-link></li>
          </ul>
        </div>
        <div class="right-section">
          <span class="greeting">您好，使用者</span>
          <button @click="logout">登出</button>
        </div>
      </div>
    </div>

    <div v-else class="nav-logged-out">
      <div class="logo">🏦 SBANK</div>
      <p class="welcome-text">歡迎使用Sheryl銀行線上系統</p>
    </div>
  </nav>
</template>

<style scoped>
.top-nav {
  background-color: #fff;
  color: #009245; /* 玉山綠深色 */
  padding: 1rem 2rem;
  font-size: 14px;
  border-bottom: 1px solid #b4d7b0;
  box-shadow: 0 2px 4px rgba(0, 146, 69, 0.1);
  font-family: 'Noto Sans TC', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.nav-logged-in {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-weight: 700;
  font-size: 1.3rem;
  color: #009245;
}

.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
}

.nav-links a {
  color: #009245;
  text-decoration: none;
  padding-bottom: 3px;
  transition: border-color 0.2s, color 0.2s;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid #009245;
  font-weight: 600;
}

.nav-links a:hover {
  color: #006622; /* 深綠 hover */
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.greeting {
  font-weight: 500;
  color: #009245;
}

button {
  background: transparent;
  border: 1px solid #009245;
  color: #009245;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background: #009245;
  color: #fff;
}

.nav-logged-out {
  text-align: center;
}

.nav-logged-out .logo {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #009245;
}

.welcome-text {
  font-size: 1rem;
  opacity: 0.8;
  color: #009245;
}
</style>
