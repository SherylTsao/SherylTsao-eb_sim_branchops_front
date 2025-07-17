<template>
  <div class="review-approval-container">
    <h2>待審核申請</h2>

    <table v-if="pendingReviews.length" class="review-table">
      <thead>
        <tr>
          <th>申請類型</th>
          <th>申請對象</th>
          <th>申請狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pendingReviews" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.target }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button class="approve-btn" @click="approve(item.id)">通過</button>
            <button class="reject-btn" @click="openRejectDialog(item.id)">駁回</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">目前無待審核申請</p>

    <!-- 駁回理由對話框 -->
    <div v-if="rejectDialogVisible" class="modal-overlay">
      <div class="modal">
        <h3>駁回理由</h3>
        <textarea v-model="rejectReason" rows="4" placeholder="請輸入駁回理由"></textarea>
        <div class="modal-buttons">
          <button class="submit-btn" @click="submitReject">送出</button>
          <button class="cancel-btn" @click="closeRejectDialog">取消</button>
        </div>
      </div>
    </div>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pendingReviews = ref([])
const errorMessage = ref('')
const successMessage = ref('')

const rejectDialogVisible = ref(false)
const rejectReason = ref('')
let rejectId = null

const fetchPendingReviews = async () => {
  try {
    const res = await axios.get('/api/review/pending')
    pendingReviews.value = Array.isArray(res.data) ? res.data : []
    errorMessage.value = ''
  } catch (err) {
    errorMessage.value = '無法取得待審核資料'
  }
}

const approve = async (id) => {
  try {
    await axios.post('/api/review/approve', { id })
    successMessage.value = '已通過申請'
    errorMessage.value = ''
    fetchPendingReviews()
  } catch (err) {
    errorMessage.value = '審核失敗'
    successMessage.value = ''
  }
}

const openRejectDialog = (id) => {
  rejectId = id
  rejectReason.value = ''
  rejectDialogVisible.value = true
}

const closeRejectDialog = () => {
  rejectDialogVisible.value = false
  rejectReason.value = ''
  rejectId = null
}

const submitReject = async () => {
  if (!rejectReason.value.trim()) {
    errorMessage.value = '請輸入駁回理由'
    return
  }
  try {
    await axios.post('/api/review/reject', {
      id: rejectId,
      reason: rejectReason.value.trim(),
    })
    successMessage.value = '已駁回申請'
    errorMessage.value = ''
    closeRejectDialog()
    fetchPendingReviews()
  } catch (err) {
    errorMessage.value = '駁回失敗'
    successMessage.value = ''
  }
}

onMounted(fetchPendingReviews)
</script>

<style scoped>
.review-approval-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #cce5d0;
  border-radius: 12px;
  font-family: 'Noto Sans TC', sans-serif;
  box-shadow: 0 2px 6px rgba(0, 146, 69, 0.1);
}

h2 {
  color: #009245;
  margin-bottom: 1.5rem;
  text-align: center;
}

.review-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.review-table th,
.review-table td {
  border: 1px solid #b4d7b0;
  padding: 0.75rem;
  text-align: center;
}

.review-table th {
  background-color: #e6f4ea;
  color: #006622;
}

button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.approve-btn {
  background-color: #009245;
  color: white;
}

.reject-btn {
  background-color: #ccc;
  color: #333;
  margin-left: 0.5rem;
}

.approve-btn:hover {
  background-color: #006622;
}

.reject-btn:hover {
  background-color: #999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

textarea {
  width: 100%;
  padding: 0.5rem;
  resize: none;
  border: 1px solid #b4d7b0;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.modal-buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.submit-btn {
  background-color: #009245;
  color: white;
}

.cancel-btn {
  background-color: #ccc;
  color: #333;
}

.success {
  color: #009245;
  font-weight: 500;
  margin-top: 1rem;
}

.error {
  color: red;
  font-weight: 500;
  margin-top: 1rem;
}

.no-data {
  text-align: center;
  color: #777;
  margin-top: 1rem;
}
</style>
