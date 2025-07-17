<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/home">🏠 首頁</router-link></li>
        <li><router-link to="/balance">💰 查詢餘額</router-link></li>
        <li><router-link to="/transfer">🔁 轉帳</router-link></li>
        <li><router-link to="/transactions">📄 交易紀錄</router-link></li>
        <li><router-link to="/change-password">🔒 修改密碼</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #1e3a8a;
  color: white;
  padding: 1.5rem 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-bottom: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
