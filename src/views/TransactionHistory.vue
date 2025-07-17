<template>
  <div class="transaction-container">
    <h2>交易紀錄查詢</h2>

    <div class="form-group">
      <label for="accNo">選擇帳號</label>
      <select v-model="selectedAccNo" @change="fetchTransactions">
        <option disabled value="">請選擇帳號</option>
        <option v-for="acc in accounts" :key="acc.accNo" :value="acc.accNo">
          {{ acc.accNo }}（{{ acc.accName }}）
        </option>
      </select>
    </div>

    <table v-if="transactions.length" class="transaction-table">
      <thead>
        <tr>
          <th>時間</th>
          <th>類型</th>
          <th>金額</th>
          <th>餘額</th>
          <th>備註</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in transactions" :key="tx.id">
          <td>{{ formatDate(tx.date) }}</td>
          <td>{{ tx.type }}</td>
          <td>{{ tx.amount.toLocaleString() }}</td>
          <td>{{ tx.balance.toLocaleString() }}</td>
          <td>{{ tx.note }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="transactions.length === 0 && selectedAccNo" class="no-data">
      查無資料
    </p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const accounts = ref([])
const selectedAccNo = ref('')
const transactions = ref([])
const errorMessage = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('/api/accounts')
    accounts.value = res.data
  } catch (err) {
    errorMessage.value = '無法載入帳號清單'
  }
})

const fetchTransactions = async () => {
  if (!selectedAccNo.value) return
  try {
    const res = await axios.get(`/api/transactions/${selectedAccNo.value}`)
    transactions.value = res.data
    errorMessage.value = ''
  } catch (err) {
    transactions.value = []
    errorMessage.value = '查詢失敗'
  }
}

const formatDate = (str) => new Date(str).toLocaleString()
</script>

<style scoped>
.transaction-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

select {
  width: 100%;
  padding: 0.5rem;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.transaction-table th,
.transaction-table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.no-data {
  text-align: center;
  margin-top: 2rem;
  color: #777;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
