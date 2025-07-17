<template>
  <div class="customer-profile-container" v-if="customer">
    <h2>顧客資料：{{ customer.name }}</h2>

    <ul class="profile-list">
      <li><strong>身分證號：</strong>{{ customer.idNumber }}</li>
      <li><strong>電話：</strong>{{ customer.phone }}</li>
      <li><strong>地址：</strong>{{ customer.address }}</li>
      <li><strong>Email：</strong>{{ customer.email }}</li>
      <li><strong>建立時間：</strong>{{ formatDate(customer.createdAt) }}</li>
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
const idNumber = route.params.idNumber

const customer = ref(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const res = await axios.get(`/api/customer/${idNumber}`)
    customer.value = res.data
  } catch (err) {
    errorMessage.value = '無法載入顧客資料'
  }
})

const formatDate = (str) => new Date(str).toLocaleString()
</script>

<style scoped>
.customer-profile-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

.profile-list {
  list-style: none;
  padding: 0;
}

.profile-list li {
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
