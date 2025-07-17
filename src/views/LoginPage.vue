<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Sheryl銀行 - 使用者登入</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="userId">帳號</label>
          <input
            v-model="userId"
            id="userId"
            type="text"
            required
            autocomplete="username"
            placeholder="請輸入帳號"
          />
        </div>
        <div class="form-group">
          <label for="password">密碼</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="請輸入密碼"
          />
        </div>
        <button type="submit">登入</button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <p class="switch-link">
        或切換到 <router-link to="/admin/login">管理者登入</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const userId = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await axios.post('/api/login', {
      userId: userId.value,
      password: password.value,
    })

    localStorage.setItem('token', res.data.token)
    router.push('/home')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || '登入失敗，請重試'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 80px 20px;
  background: linear-gradient(180deg, #e6f0e6 0%, #c9e5c9 100%);
  font-family: 'Noto Sans TC', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #004d26;
}

.login-box {
  background: #fff;
  color: #004d26;
  padding: 3rem 3.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 146, 69, 0.2);
  width: 480px;
  max-width: 100%;
  text-align: center;
}

.login-box h1 {
  margin-bottom: 2.2rem;
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: 0.05em;
}

.form-group {
  margin-bottom: 1.6rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: #004d26;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px 14px;
  font-size: 1rem;
  border: 1.6px solid #90bfa1;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  color: #004d26;
  background-color: #f4faf4;
}

input[type='text']:focus,
input[type='password']:focus {
  outline: none;
  border-color: #009245;
  box-shadow: 0 0 6px #00924599;
  background: #ffffff;
}

button {
  width: 100%;
  padding: 14px 0;
  background-color: #009245;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 146, 69, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #006622;
  box-shadow: 0 6px 16px rgba(0, 102, 34, 0.6);
}

.error {
  margin-top: 1.2rem;
  color: #a94442;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.02em;
}

/* 切換連結 */
.switch-link {
  margin-top: 1.4rem;
  font-size: 0.9rem;
  color: #009245;
}

.switch-link a {
  color: #007f33;
  text-decoration: underline;
  cursor: pointer;
}
</style>
