<template>
  <div class="home-container">
    <h2>歡迎回來，{{ userName }}！</h2>
    <p>請選擇您要使用的功能：</p>

    <div class="card-container">
      <div class="card" @click="goTo('/balance')">查詢餘額</div>
      <div class="card" @click="goTo('/transfer')">轉帳作業</div>
      <div class="card" @click="goTo('/transactions')">交易紀錄查詢</div>
      <div class="card" @click="goTo('/change-password')">修改密碼</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('')

onMounted(() => {
  // 假設登入後有儲存 userName
  userName.value = localStorage.getItem('userName') || '使用者'
})

const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 2rem;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.card {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.card:hover {
  background-color: #d6e4ff;
}
</style>
