// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://backend:8000', // đổi nếu khác
  withCredentials: true, // ⚠️ Bắt buộc để gửi cookie + nhận CSRF token
  headers: {
    Accept: 'application/json',
  },
})

export default api
