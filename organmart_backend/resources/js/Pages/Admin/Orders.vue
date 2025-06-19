<template>
  <AdminLayout>
    <div class="container py-4">
      <h1 class="shadow-sm border border-1 border-light mb-4 py-4 px-3 h4 fw-bold">Quản lý Đơn hàng</h1>

      <table class="shadow-sm border border-1 border-light table table-bordered text-center align-middle">
        <thead class="table-primary">
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th class="w-25">Trạng thái</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders.data" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.user_name || 'Ẩn danh' }}</td>
            <td>{{ formatPrice(order.total) }}</td>
            <td>
              <select
                class="form-select form-select-sm mx-auto"
                :class="statusClass(order.status)"
                v-model="order.status"
                @change="updateStatus(order.id, order.status)"
                style="max-width: 110px"
              >
                <option value="pending">Chờ xử lý</option>
                <option value="completed">Hoàn tất</option>
                <option value="delivered">Đã giao</option>
                <option value="canceled">Đã hủy</option>
              </select>
            </td>
            <td>{{ formatDate(order.created_at) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: !orders.prev_page_url }">
            <button class="page-link" @click="changePage(orders.current_page - 1)" :disabled="!orders.prev_page_url">‹</button>
          </li>
          <li class="page-item disabled">
            <span class="page-link">Trang {{ orders.current_page }} / {{ orders.last_page }}</span>
          </li>
          <li class="page-item" :class="{ disabled: !orders.next_page_url }">
            <button class="page-link" @click="changePage(orders.current_page + 1)" :disabled="!orders.next_page_url">›</button>
          </li>
        </ul>
      </nav>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../Layouts/AdminLayout.vue'
import { Inertia } from '@inertiajs/inertia'
const props = defineProps({
  orders: Object,
})

const formatPrice = val =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0)

const formatDate = val => new Date(val).toLocaleString('vi-VN')

const changePage = (page) => {
  if (page < 1 || page > props.orders.last_page) return
  Inertia.get('/orders', { page }) // Gọi lại route với param page để phân trang
}

// Gửi AJAX gọi route cập nhật
const updateStatus = (orderId, status) => {
  Inertia.post(`/orders/${orderId}/update-status`, { status }, {
    preserveScroll: true,
    onSuccess: () => {
      alert('Cập nhật trạng thái thành công!')
    },
    onError: () => {
      alert('Cập nhật trạng thái thất bại!')
    }
  })
}

// Trả về class theo status
const statusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'border-warning text-warning'
    case 'completed':
      return 'border-success text-success'
    case 'delivered':
      return 'border-primary text-primary'
    case 'canceled':
      return 'border-danger text-danger'
    default:
      return 'border-secondary text-secondary'
  }
}

</script>
