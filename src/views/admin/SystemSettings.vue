<template>
  <div class="system-settings-container">
    <h2>系統設定</h2>

    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label for="transferLimit">單筆轉帳上限 (元)</label>
        <input
          id="transferLimit"
          type="number"
          min="0"
          v-model.number="settings.transferLimit"
          required
        />
      </div>

      <div class="form-group">
        <label for="passwordMinLength">密碼最小長度</label>
        <input
          id="passwordMinLength"
          type="number"
          min="6"
          v-model.number="settings.passwordMinLength"
          required
        />
      </div>

      <div class="form-group checkbox-group">
        <input
          id="passwordRequireSpecial"
          type="checkbox"
          v-model="settings.passwordRequireSpecial"
        />
        <label for="passwordRequireSpecial">密碼需包含特殊字元</label>
      </div>

      <button type="submit">儲存設定</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const settings = ref({
  transferLimit: 100000,
  passwordMinLength: 8,
  passwordRequireSpecial: false,
})

const successMessage = ref('')
const errorMessage = ref('')

const fetchSettings = async () => {
  try {
    const res = await axios.get('/api/admin/settings')

    if (typeof res.data !== 'object') {
      throw new Error('API response is not JSON')
    }

    settings.value = {
      transferLimit: res.data.transferLimit ?? 100000,
      passwordMinLength: res.data.passwordMinLength ?? 8,
      passwordRequireSpecial: res.data.passwordRequireSpecial ?? false,
    }

    errorMessage.value = ''
  } catch (err) {
    console.error('fetchSettings error:', err)
    errorMessage.value = '無法載入設定，請確認您已登入'
  }
}



const saveSettings = async () => {
  try {
    await axios.put('/api/admin/settings', settings.value)
    successMessage.value = '設定已儲存'
    errorMessage.value = ''
  } catch (err) {
    successMessage.value = ''
    errorMessage.value = '儲存失敗'
  }
}

onMounted(() => {
  fetchSettings()
})
</script>

<style scoped>
.system-settings-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #cce5d0;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 146, 69, 0.1);
  font-family: 'Noto Sans TC', sans-serif;
}

h2 {
  text-align: center;
  color: #009245;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #006622;
}

input[type='number'],
input[type='text'],
input[type='date'] {
  padding: 0.5rem;
  border: 1px solid #b4d7b0;
  border-radius: 4px;
  font-size: 1rem;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

button {
  margin-top: 1rem;
  background-color: #009245;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #006622;
}

.success {
  color: #009245;
  margin-top: 1rem;
  font-weight: 500;
}

.error {
  color: red;
  margin-top: 1rem;
  font-weight: 500;
}
</style>
