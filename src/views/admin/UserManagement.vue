<template>
  <div class="user-management-container">
    <h2>使用者管理</h2>

    <div class="toolbar">
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="搜尋使用者帳號或姓名"
        @input="fetchUsers"
      />
      <button @click="showAddDialog = true">新增使用者</button>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>帳號</th>
          <th>姓名</th>
          <th>電子郵件</th>
          <th>角色</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.status }}</td>
          <td>
            <button class="edit-btn" @click="editUser(user)">編輯</button>
            <button class="delete-btn" @click="deleteUser(user.id)">刪除</button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="6">無符合條件的使用者</td>
        </tr>
      </tbody>
    </table>

    <!-- 新增/編輯對話框 -->
    <div v-if="showAddDialog || editTarget" class="modal-overlay">
      <div class="modal">
        <h3>{{ editTarget ? '編輯使用者' : '新增使用者' }}</h3>

        <form @submit.prevent="submitUser">
          <div class="form-group">
            <label>帳號</label>
            <input v-model="form.username" :readonly="editTarget" required />
          </div>
          <div class="form-group">
            <label>姓名</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>電子郵件</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>角色</label>
            <select v-model="form.role" required>
              <option value="user">使用者</option>
              <option value="admin">管理員</option>
            </select>
          </div>
          <div class="form-group">
            <label>狀態</label>
            <select v-model="form.status" required>
              <option value="active">啟用</option>
              <option value="inactive">停用</option>
            </select>
          </div>

          <div class="modal-buttons">
            <button type="submit" class="submit-btn">{{ editTarget ? '儲存' : '新增' }}</button>
            <button type="button" @click="closeDialog" class="cancel-btn">取消</button>
          </div>
        </form>
      </div>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const searchKeyword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const showAddDialog = ref(false)
const editTarget = ref(null)

const form = reactive({
  username: '',
  name: '',
  email: '',
  role: 'user',
  status: 'active',
})

const fetchUsers = async () => {
  try {
    const params = searchKeyword.value ? { q: searchKeyword.value } : {}
    const res = await axios.get('/api/admin/users', { params })

    users.value = Array.isArray(res.data) ? res.data : []
    errorMessage.value = ''
  } catch (err) {
    errorMessage.value = '無法取得使用者資料'
    users.value = []
  }
}

const filteredUsers = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  return users.value.filter((u) =>
    u.username.toLowerCase().includes(keyword) ||
    u.name.toLowerCase().includes(keyword)
  )
})

const closeDialog = () => {
  showAddDialog.value = false
  editTarget.value = null
  resetForm()
}

const resetForm = () => {
  form.username = ''
  form.name = ''
  form.email = ''
  form.role = 'user'
  form.status = 'active'
  errorMessage.value = ''
  successMessage.value = ''
}

const submitUser = async () => {
  try {
    if (editTarget.value) {
      await axios.put(`/api/admin/users/${editTarget.value.id}`, { ...form })
      successMessage.value = '使用者更新成功'
    } else {
      await axios.post('/api/admin/users', { ...form })
      successMessage.value = '使用者新增成功'
    }
    errorMessage.value = ''
    closeDialog()
    fetchUsers()
  } catch (err) {
    errorMessage.value = err.response?.data?.message || '操作失敗'
    successMessage.value = ''
  }
}

const editUser = (user) => {
  editTarget.value = user
  form.username = user.username
  form.name = user.name
  form.email = user.email
  form.role = user.role
  form.status = user.status
  showAddDialog.value = true
}

const deleteUser = async (id) => {
  if (!confirm('確定要刪除此使用者嗎？')) return
  try {
    await axios.delete(`/api/admin/users/${id}`)
    successMessage.value = '使用者刪除成功'
    errorMessage.value = ''
    fetchUsers()
  } catch (err) {
    errorMessage.value = '刪除失敗'
    successMessage.value = ''
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.user-management-container {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  font-family: 'Noto Sans TC', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #004d1a; /* 深玉山綠文字 */
  background-color: #e6f0e6; /* 淺綠背景 */
  border-radius: 10px;
  box-shadow: 0 0 10px #b3d9b3;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #007a33; /* 主綠色 */
  font-weight: 700;
}

.toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.toolbar input {
  flex-grow: 1;
  padding: 0.6rem 0.8rem;
  border: 1.5px solid #007a33;
  border-radius: 6px;
  font-size: 1rem;
  color: #004d1a;
  background-color: #f0f8f0;
  transition: border-color 0.3s ease;
}

.toolbar input:focus {
  outline: none;
  border-color: #00591a;
  background-color: #e0f0e0;
}

.toolbar button {
  padding: 0.6rem 1.2rem;
  background-color: #009245;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 10px #70b970;
  transition: background-color 0.3s ease;
}

.toolbar button:hover {
  background-color: #007a33;
  box-shadow: 0 6px 12px #509150;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 6px #a6d4a6;
  border-radius: 8px;
  overflow: hidden;
}

.user-table th,
.user-table td {
  border: 1px solid #b3d9b3;
  padding: 0.6rem;
  text-align: center;
  color: #004d1a;
}

.user-table th {
  background-color: #009245;
  color: white;
  font-weight: 700;
}

.user-table tr:nth-child(even) {
  background-color: #e6f0e6;
}

.user-table tr:hover {
  background-color: #c8e6c9;
}

.edit-btn,
.delete-btn {
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #66bb6a;
  color: white;
}

.edit-btn:hover {
  background-color: #388e3c;
}

.delete-btn {
  background-color: #e57373;
  color: white;
  margin-left: 0.5rem;
}

.delete-btn:hover {
  background-color: #b71c1c;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 146, 69, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  width: 420px;
  box-shadow: 0 8px 20px rgba(0, 146, 69, 0.4);
  color: #004d1a;
}

h3 {
  margin-bottom: 1rem;
  color: #007a33;
  font-weight: 700;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #004d1a;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1.5px solid #007a33;
  border-radius: 6px;
  font-size: 1rem;
  color: #004d1a;
  background-color: #f0f8f0;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #00591a;
  background-color: #e0f0e0;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.2rem;
}

.submit-btn {
  background-color: #009245;
  border: none;
  color: white;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 10px #70b970;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #007a33;
  box-shadow: 0 6px 12px #509150;
}

.cancel-btn {
  background-color: #ccc;
  border: none;
  color: #333;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #aaa;
}

.success {
  color: #007a33;
  margin-top: 1rem;
  font-weight: 600;
}

.error {
  color: #b71c1c;
  margin-top: 1rem;
  font-weight: 600;
}
</style>
