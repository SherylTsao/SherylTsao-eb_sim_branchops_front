<template>
  <div class="transfer-container">
    <h2>轉帳作業</h2>

    <form @submit.prevent="submitTransfer">
      <div class="form-group">
        <label for="fromAcc">轉出帳號</label>
        <select v-model="fromAccount" required>
          <option disabled value="">請選擇帳號</option>
          <option v-for="acc in accounts" :key="acc.accNo" :value="acc.accNo">
            {{ acc.accNo }}（{{ acc.accName }}）
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="toAcc">轉入帳號</label>
        <input v-model="toAccount" type="text" required />
      </div>

      <div class="form-group">
        <label for="amount">金額</label>
        <input v-model.number="amount" type="number" min="1" required />
      </div>

      <div class="form-group">
        <label for="note">備註</label>
        <input v-model="note" type="text" />
      </div>

      <button type="submit">送出轉帳</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const accounts = ref([])
const fromAccount = ref('')
const toAccount = ref('')
const amount = ref(null)
const note = ref('')
const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('/api/accounts')
    accounts.value = res.data
  } catch (err) {
    errorMessage.value = '載入帳號失敗'
  }
})

const submitTransfer = async () => {
  try {
    await axios.post('/api/transfer', {
      fromAccount: fromAccount.value,
      toAccount: toAccount.value,
      amount: amount.value,
      note: note.value,
    })
    successMessage.value = '轉帳成功'
    errorMessage.value = ''
    // 清空欄位
    toAccount.value = ''
    amount.value = null
    note.value = ''
  } catch (err) {
    successMessage.value = ''
    errorMessage.value = err.response?.data?.message || '轉帳失敗'
  }
}
</script>

<style scoped>
.transfer-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
}

.success {
  color: green;
  margin-top: 1rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
