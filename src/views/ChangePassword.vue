<template>
  <div class="change-password-container">
    <h2>修改密碼</h2>

    <form @submit.prevent="submitPasswordChange">
      <div class="form-group">
        <label for="current">原密碼</label>
        <input v-model="currentPassword" type="password" required />
      </div>

      <div class="form-group">
        <label for="new">新密碼</label>
        <input v-model="newPassword" type="password" required />
      </div>

      <div class="form-group">
        <label for="confirm">確認新密碼</label>
        <input v-model="confirmPassword" type="password" required />
      </div>

      <button type="submit">送出修改</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const successMessage = ref('')
const errorMessage = ref('')

const submitPasswordChange = async () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = '新密碼與確認密碼不一致'
    successMessage.value = ''
    return
  }

  try {
    await axios.put('/api/change-password', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    })
    successMessage.value = '密碼修改成功'
    errorMessage.value = ''
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    successMessage.value = ''
    errorMessage.value = err.response?.data?.message || '修改失敗'
  }
}
</script>

<style scoped>
.change-password-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

input {
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
