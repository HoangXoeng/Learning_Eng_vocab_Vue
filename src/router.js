import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/HomeView.vue'
import About from './components/AboutView.vue'

// Định nghĩa các route
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// Khởi tạo router với lịch sử duyệt web
const router = createRouter({
  history: createWebHistory(),
  routes, // Sử dụng danh sách routes đã định nghĩa
})

export default router
