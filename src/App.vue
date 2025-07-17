<template>
  <div id="app">
    <TopNav v-if="showLayout" />
    <main class="main-content">
      <router-view />
    </main>
    <Footer v-if="showLayout" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import TopNav from './components/TopNav.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const showLayout = !['/login', '/admin/login'].includes(route.path)
</script>

<style>
body {
  margin: 0;
  font-family: 'Noto Sans TC', sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
  padding-bottom: 40px; /* 預留 footer 高度 */
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1024px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
}
</style>
