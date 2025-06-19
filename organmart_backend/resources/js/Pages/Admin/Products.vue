<template>
  <AdminLayout>
    <div class="container py-4">
      <!-- Header -->
      <div class="shadow-sm border border-1 border-light d-flex justify-content-between align-items-center mb-4 p-3">
        <h1 class="h4 fw-bold">Quản lý Sản phẩm</h1>
        <button class="btn btn-primary" @click="openModal">Tạo sản phẩm mới</button>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal d-block" style="background: rgba(0,0,0,0.5)">
        <div class="modal-dialog">
          <div class="modal-content">
            <form @submit.prevent="submitForm">
              <div class="modal-header">
                <h5 class="modal-title">{{ form.id ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm' }}</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <!-- Preview -->
                <div v-if="imagePreview" class="text-center mb-3">
                  <img :src="imagePreview" class="img-thumbnail" style="width:120px;height:120px;object-fit:cover;">
                </div>
                <!-- Fields -->
                <input v-model="form.name" placeholder="Tên sản phẩm" class="form-control mb-3" required>
                <textarea v-model="form.description" placeholder="Mô tả" class="form-control mb-3" rows="3"></textarea>
                <input v-model.number="form.price" type="number" class="form-control mb-3" placeholder="Giá" required min="0" step="0.01">
                <input v-model.number="form.stock_quantity" type="number" class="form-control mb-3" placeholder="Tồn kho" required min="0">
                <select v-model.number="form.category_id" class="form-select mb-3" required>
                    <option disabled value="">-- Chọn danh mục --</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>
                <input type="file" class="form-control" accept="image/*" @change="onFileChange">
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" type="button" @click="closeModal">Hủy</button>
                <button class="btn btn-primary" type="submit">{{ form.id ? 'Cập nhật' : 'Tạo' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="table-responsive card shadow-sm border-1 border-light p-2">
        <table class="table table-bordered text-center align-middle">
          <thead class="table-primary">
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <img v-if="product.image_url" :src="product.image_url" class="img-thumbnail" style="width:60px;height:60px;object-fit:cover;">
                <span v-else>Không có</span>
              </td>
              <td>{{ product.name }}</td>
              <td class="text-start text-wrap align-middle" style="max-width: 250px;">
                <div>
                    <span v-if="!expandedDescriptions.has(product.id)">
                    {{ truncate(product.description, 50) }}
                    <template v-if="product.description.length > 50">
                        <small>
                          <a href="#" @click.prevent="toggleDescription(product.id)" class="text-decoration-none ms-1">...</a>
                        </small>
                    </template>
                    </span>
                    <span v-else>
                    {{ product.description }}
                    <small>
                        <a href="#" @click.prevent="toggleDescription(product.id)" class="text-decoration-none ms-1">Thu gọn</a>
                    </small>
                    </span>
                </div>
                </td>
              <td>{{ formatPrice(product.price) }}</td>
              <td>{{ product.stock_quantity }}</td>
              <td>{{ findCategoryName(product.category_id) }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" @click="editProduct(product)">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(product.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <nav class="d-flex justify-content-center mt-4">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
              <button class="page-link" @click="firstPage">«</button>
            </li>
            <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
              <button class="page-link" @click="prevPage">‹</button>
            </li>
            <li class="page-item disabled">
              <span class="page-link">Trang {{ pagination.current_page }} / {{ pagination.last_page }}</span>
            </li>
            <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
              <button class="page-link" @click="nextPage">›</button>
            </li>
            <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
              <button class="page-link" @click="lastPage">»</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../Layouts/AdminLayout.vue'

const products = ref([])
const categories = ref([])
const showModal = ref(false)
const imagePreview = ref('')
const base64Image = ref('')
const expandedDescriptions = ref(new Set())

const form = ref({
  id: null,
  name: '',
  description: '',
  price: null,
  stock_quantity: null,
  category_id: null
})

const pagination = ref({
  current_page: 1,
  last_page: 1
})

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || ''

const truncate = (text, length) => text?.length > length ? text.slice(0, length) : text || '-'
const formatPrice = val => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0)
const toggleDescription = id => expandedDescriptions.value.has(id) ? expandedDescriptions.value.delete(id) : expandedDescriptions.value.add(id)
const findCategoryName = id => categories.value.find(c => c.id === id)?.name || 'Không xác định'

const openModal = () => { resetForm(); showModal.value = true }
const closeModal = () => { showModal.value = false }

const resetForm = () => {
  form.value = { id: null, name: '', description: '', price: null, stock_quantity: null, category_id: null }
  base64Image.value = ''
  imagePreview.value = ''
}

const onFileChange = e => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    base64Image.value = e.target.result
    imagePreview.value = base64Image.value
  }
  reader.readAsDataURL(file)
}

const fetchProducts = async (page = 1) => {
  const res = await fetch(`/api/products?page=${page}`)
  const data = await res.json()
  products.value = data.data
  pagination.value = {
    current_page: data.current_page,
    last_page: data.last_page
  }
}

const fetchCategories = async () => {
  const res = await fetch('/api/categories')
  categories.value = await res.json()
}

const submitForm = async () => {
  const id = form.value.id
  const url = id ? `/api/products/${id}` : '/api/products'
  const method = id ? 'PUT' : 'POST'
  const payload = { ...form.value }
  if (base64Image.value) payload.image_url = base64Image.value

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    alert(id ? 'Cập nhật thành công!' : 'Tạo mới thành công!')
    closeModal()
    resetForm()
    await fetchProducts(pagination.value.current_page)
  } else {
    const err = await res.json()
    alert('Lỗi: ' + (err.message || JSON.stringify(err)))
  }
}

const editProduct = product => {
  form.value = { ...product }
  imagePreview.value = product.image_url || ''
  base64Image.value = ''
  showModal.value = true
}

const deleteProduct = async id => {
  if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: { 'X-CSRF-TOKEN': csrfToken }
  })
  if (res.ok) {
    products.value = products.value.filter(p => p.id !== id)
    alert('Đã xóa thành công!')
  } else {
    alert('Lỗi khi xóa sản phẩm!')
  }
}

const goToPage = page => (page >= 1 && page <= pagination.value.last_page) && fetchProducts(page)
const nextPage = () => goToPage(pagination.value.current_page + 1)
const prevPage = () => goToPage(pagination.value.current_page - 1)
const firstPage = () => goToPage(1)
const lastPage = () => goToPage(pagination.value.last_page)

onMounted(async () => {
  await fetchCategories()
  await fetchProducts(1)
})
</script>
