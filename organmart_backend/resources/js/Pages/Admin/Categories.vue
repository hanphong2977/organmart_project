<template>
  <AdminLayout>
    <div class="container py-4">

      <!-- Header -->
      <div class="mb-4 card p-3 shadow-sm border border-1 border-light d-flex flex-row justify-content-between align-items-center">
        <h1 class="h5 fw-bold mb-0">Quản lý Danh Mục</h1>
        <button @click="openCreateModal" class="btn btn-primary d-flex align-items-center gap-1">
          <i class="bi bi-plus-lg"></i> Thêm mới
        </button>
      </div>

      <!-- Table Card -->
      <div class="card shadow-sm border-1 border-light">
        <div class="card-body">
          <table class="table table-bordered table-hover align-middle text-center mb-0">
            <thead class="table-primary">
              <tr>
                <th style="width: 50%;">Tên danh mục</th>
                <th style="width: 15%;">Ảnh</th>
                <th style="width: 35%;">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in categories" :key="cat.id">
                <td class="text-start">{{ cat.name }}</td>
                <td>
                  <img
                    v-if="cat.image_url"
                    :src="cat.image_url"
                    class="img-thumbnail mx-auto"
                    style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;"
                    alt="Ảnh danh mục"
                  />
                  <span v-else>Không có</span>
                </td>
                <td>
                  <button
                    @click="openEditModal(cat)"
                    class="btn btn-sm btn-outline-primary me-2"
                    title="Sửa"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    @click="deleteCategory(cat.id)"
                    class="btn btn-sm btn-outline-danger"
                    title="Xóa"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-3 shadow fade-in">
            <form @submit.prevent="saveCategory">
              <div class="modal-header">
                <h5 class="modal-title">{{ form.id ? 'Cập nhật' : 'Tạo mới' }} danh mục</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Tên danh mục</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Ảnh</label>
                  <input type="file" class="form-control" @change="handleImage" accept="image/*" />
                  <img
                    v-if="previewImage"
                    :src="previewImage"
                    class="mt-2 img-thumbnail"
                    style="width: 64px; height: 64px; object-fit: cover; border-radius: 6px;"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const categories = ref([]);
const search = ref('');
const showModal = ref(false);
const form = ref({ id: null, name: '', image_url: '' });
const previewImage = ref('');

function fetchCategories() {
  axios.get('/api/categories', { params: { search: search.value } }).then(res => {
    categories.value = res.data;
  });
}

function openCreateModal() {
  form.value = { id: null, name: '', image_url: '' };
  previewImage.value = '';
  showModal.value = true;
}

function openEditModal(cat) {
  form.value = { id: cat.id, name: cat.name, image_url: '' };
  previewImage.value = cat.image_url;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  form.value = { id: null, name: '', image_url: '' };
  previewImage.value = '';
}

function handleImage(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      form.value.image_url = event.target.result;
      previewImage.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function saveCategory() {
  const method = form.value.id ? 'put' : 'post';
  const url = form.value.id ? `/api/categories/${form.value.id}` : '/api/categories';

  axios[method](url, form.value).then(() => {
    fetchCategories();
    closeModal();
  }).catch(err => {
    alert('Lỗi: ' + (err.response?.data?.message || 'Không rõ'));
  });
}

function deleteCategory(id) {
  if (confirm('Bạn có chắc muốn xóa?')) {
    axios.delete(`/api/categories/${id}`).then(() => {
      fetchCategories();
    });
  }
}

onMounted(fetchCategories);
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
