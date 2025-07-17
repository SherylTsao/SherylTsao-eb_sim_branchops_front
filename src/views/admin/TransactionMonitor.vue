<template>
  <div class="transaction-monitor-container">
    <h2>交易監控</h2>

    <div class="filter-bar">
      <input v-model="filters.account" type="text" placeholder="帳號" />
      <input v-model="filters.type" type="text" placeholder="交易類型" />
      <input v-model="filters.startDate" type="date" />
      <input v-model="filters.endDate" type="date" />
      <button @click="fetchTransactions">查詢</button>
      <button class="reset" @click="resetFilters">重置</button>
    </div>

    <table class="transaction-table" v-if="transactions.length">
      <thead>
        <tr>
          <th>交易ID</th>
          <th>帳號</th>
          <th>時間</th>
          <th>類型</th>
          <th>金額</th>
          <th>餘額</th>
          <th>備註</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in transactions" :key="tx.id">
          <td>{{ tx.id }}</td>
          <td>{{ tx.account }}</td>
          <td>{{ formatDate(tx.date) }}</td>
          <td>{{ tx.type }}</td>
          <td>{{ tx.amount.toLocaleString() }}</td>
          <td>{{ tx.balance.toLocaleString() }}</td>
          <td>{{ tx.note }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">查無交易紀錄</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const transactions = ref([])
const errorMessage = ref('')

const filters = ref({
  account: '',
  type: '',
  startDate: '',
  endDate: '',
})

const fetchTransactions = async () => {
  try {
    const params = {}

    if (filters.value.account) params.account = filters.value.account
    if (filters.value.type) params.type = filters.value.type
    if (filters.value.startDate) params.startDate = filters.value.startDate
    if (filters.value.endDate) params.endDate = filters.value.endDate

    const res = await axios.get('/api/admin/transactions', { params })
    transactions.value = res.data
    errorMessage.value = ''
  } catch (err) {
    errorMessage.value = '查詢失敗'
  }
}

const resetFilters = () => {
  filters.value = {
    account: '',
    type: '',
    startDate: '',
    endDate: '',
  }
  transactions.value = []
}

const formatDate = (str) => new Date(str).toLocaleString()
</script>

<style scoped>
.transaction-monitor-container {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  font-family: 'Noto Sans TC', sans-serif;
  color: #004d1a;
}

h2 {
  color: #007a33;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.filter-bar input {
  padding: 0.5rem;
  border: 1px solid #b4d7b0;
  border-radius: 4px;
  width: 150px;
}

.filter-bar button {
  padding: 0.5rem 1.2rem;
  background-color: #007a33;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-bar button.reset {
  background-color: #cccccc;
  color: #333;
}

.filter-bar button:hover {
  background-color: #009245;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.transaction-table th,
.transaction-table td {
  border: 1px solid #cce0cc;
  padding: 0.6rem;
  text-align: center;
}

.transaction-table th {
  background-color: #e6f0e6;
  color: #007a33;
}

.transaction-table tbody tr:nth-child(odd) {
  background-color: #f8fbf8;
}

.no-data {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
