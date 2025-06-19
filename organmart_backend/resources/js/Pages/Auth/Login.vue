<template>
  <div
    class="min-vh-100 d-flex justify-content-center align-items-center position-relative"
    style="background-image: url('/images/background.jpg'); background-size: cover; background-position: center;"
  >
    <!-- Form -->
    <form
      @submit.prevent="submit"
      class="bg-white p-4 rounded shadow w-100 mt-5"
      style="max-width: 360px;"
    >
      <h2 class="h4 mb-4 text-center text-dark">Đăng Nhập</h2>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="form-control"
          required
          autocomplete="email"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="form-control"
          required
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import api from '../../api'
const form = ref({
  email: '',
  password: ''
})

const submit = async () => {
  try {
    // Bước 1: Gọi csrf-cookie để nhận cookie + XSRF-TOKEN
    await api.get('/sanctum/csrf-cookie')

    // Bước 2: Đăng nhập
    await api.post('/login', form.value)

    // ✅ Sau khi đăng nhập thành công → chuyển hướng đến /admin
    Inertia.visit('/admin')
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.status, error.response.data)
      alert('Email hoặc mật khẩu không đúng hoặc không có quyền truy cập!')
    } else if (error.request) {
      console.error('No response received:', error.request)
      alert('Lỗi kết nối đến server. Vui lòng thử lại sau.')
    } else {
      console.error('Error setting up request:', error.message)
      alert('Đã xảy ra lỗi không xác định.')
    }
  }
}

</script>


