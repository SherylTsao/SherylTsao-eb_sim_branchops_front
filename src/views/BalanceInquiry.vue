<template>
  <div class="balance-container">
    <h2>帳戶餘額查詢</h2>

    <div class="form-group">
      <label for="account">選擇帳號</label>
      <select v-model="selectedAccNo" @change="fetchBalance">
        <option disabled value="">請選擇帳號</option>
        <option v-for="acc in accounts" :key="acc.accNo" :value="acc.accNo">
          {{ acc.accNo }}（{{ acc.accName }}）
        </option>
      </select>
    </div>

    <div v-if="balance !== null" class="result">
      <p><strong>帳號：</strong>{{ selectedAccNo }}</p>
      <p><strong>餘額：</strong>${{ balance.toLocaleString() }}</p>
      <p><strong>狀態：</strong>{{ accountStatus }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const accounts = ref([])
const selectedAccNo = ref('')
const balance = ref(null)
const accountStatus = ref('')
const errorMessage = ref('')

onMounted(async () => {
  try {
    // 假設登入後有 token，可加上 headers 傳送
    const res = await axios.get('/api/accounts')
    accounts.value = res.data
  } catch (err) {
    errorMessage.value = '載入帳號失敗'
  }
})

const fetchBalance = async () => {
  if (!selectedAccNo.value) return
  try {
    const res = await axios.get(`/api/balance?accNo=${selectedAccNo.value}`)
    balance.value = res.data.balance
    accountStatus.value = res.data.status
    errorMessage.value = ''
  } catch (err) {
    balance.value = null
    accountStatus.value = ''
    errorMessage.value = '查詢失敗'
  }
}
</script>

<style scoped>
.balance-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

select {
  width: 100%;
  padding: 0.5rem;
}

.result {
  background: #f7f7f7;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
