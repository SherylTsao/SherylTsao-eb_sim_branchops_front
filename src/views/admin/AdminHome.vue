<template>
  <div class="admin-home-container">
    <h2>管理系統首頁</h2>

    <div class="card-container">
      <div class="card" @click="goTo('/admin/users')">使用者管理</div>
      <div class="card" @click="goTo('/admin/transactions')">交易監控</div>
      <div class="card" @click="goTo('/admin/settings')">系統設定</div>
      <div class="card" @click="goTo('/admin/review')">審核管理</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.admin-home-container {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  color: #004d1a; /* 玉山深綠 */
  font-family: 'Noto Sans TC', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  font-weight: 700;
  color: #007a33; /* 主綠 */
  margin-bottom: 2rem;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.card {
  width: 150px;
  height: 150px;
  background-color: #e6f0e6; /* 淺綠背景 */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: #007a33; /* 主綠字 */
  cursor: pointer;
  box-shadow: 0 3px 8px #b3d9b3;
  user-select: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  background-color: #009245; /* 玉山綠 */
  color: white;
  box-shadow: 0 6px 15px #70b970;
}
</style>
