<template>
  <div class="admin-login-container">
    <h2>管理員登入</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="admin-username">帳號</label>
        <input v-model="username" id="admin-username" type="text" required />
      </div>

      <div class="form-group">
        <label for="admin-password">密碼</label>
        <input v-model="password" id="admin-password" type="password" required />
      </div>

      <button type="submit">登入</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p class="switch-link">
      或切換到 <router-link to="/login">使用者登入</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  try {
    const res = await axios.post('/api/admin/login', {
      username: username.value,
      password: password.value,
    })

    localStorage.setItem('adminToken', res.data.token)
    router.push('/admin/home')
  } catch (err) {
    errorMessage.value = '登入失敗，請確認帳號密碼'
  }
}
</script>

<style scoped>
.admin-login-container {
  max-width: 400px;
  margin: auto;
  padding: 2.5rem 2rem;
  background: #f5fdfa; /* 淺綠白背景 */
  color: #00563f;      /* 深綠字體 */
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 133, 89, 0.2);
  font-family: 'Noto Sans TC', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

h2 {
  font-weight: 700;
  margin-bottom: 2rem;
  color: #008759; /* 玉山綠 */
}

.form-group {
  margin-bottom: 1.4rem;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.4rem;
  color: #00563f;
}

input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1.6px solid #a3d9b1;
  border-radius: 8px;
  background-color: #e8f7ed; /* 很淺綠 */
  color: #00563f;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #008759;
  box-shadow: 0 0 8px #00875988;
  background: #f0fff4;
}

button {
  width: 100%;
  padding: 0.75rem 0;
  background-color: #008759;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 135, 89, 0.5);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #006d47;
  box-shadow: 0 8px 20px rgba(0, 109, 71, 0.6);
}

.error {
  color: #c0392b;
  margin-top: 1.2rem;
  font-weight: 600;
}

.switch-link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #007a4a;
}

.switch-link a {
  color: #00a858;
  text-decoration: underline;
  cursor: pointer;
}
</style>
