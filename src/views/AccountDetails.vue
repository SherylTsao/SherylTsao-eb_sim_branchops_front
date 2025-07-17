<template>
  <div class="account-details-container" v-if="account">
    <h2>帳戶詳情：{{ account.accNo }}</h2>

    <ul class="details-list">
      <li><strong>帳戶名稱：</strong>{{ account.accName }}</li>
      <li><strong>餘額：</strong>{{ account.balance.toLocaleString() }}</li>
      <li><strong>帳戶狀態：</strong>{{ account.status }}</li>
      <li><strong>建立時間：</strong>{{ formatDate(account.createdAt) }}</li>
    </ul>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

  <div v-else-if="!errorMessage" class="loading">載入中...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const accNo = route.params.accNo

const account = ref(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const res = await axios.get(`/api/account/${accNo}`)
    account.value = res.data
  } catch (err) {
    errorMessage.value = '無法載入帳戶資料'
  }
})

const formatDate = (str) => new Date(str).toLocaleString()
</script>

<style scoped>
.account-details-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

.details-list {
  list-style: none;
  padding: 0;
}

.details-list li {
  margin-bottom: 0.75rem;
}

.error {
  color: red;
}

.loading {
  text-align: center;
  margin-top: 2rem;
  color: #777;
}
</style>
