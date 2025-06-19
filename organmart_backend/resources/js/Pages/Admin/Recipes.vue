<template>
  <AdminLayout>
    <div class="container py-4">
      <!-- Header -->
      <div class="shadow-sm border border-1 border-light d-flex justify-content-between align-items-center mb-4 p-3">
        <h1 class="h4 fw-bold">Quản lý Công thức</h1>
        <button class="btn btn-primary" @click="openModal">Tạo công thức mới</button>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal d-block" style="background: rgba(0,0,0,0.5)">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <form @submit.prevent="createOrUpdateRecipe">
              <div class="modal-header">
                <h5 class="modal-title">{{ form.id ? 'Cập nhật công thức' : 'Tạo công thức' }}</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <!-- Preview ảnh -->
                <div v-if="imagePreview" class="text-center mb-3">
                  <img :src="imagePreview" alt="Ảnh công thức" class="img-thumbnail" style="max-height: 160px; object-fit: cover;">
                </div>

                <!-- Upload ảnh -->
                <div class="mb-3">
                  <input
                    class="form-control"
                    type="file"
                    accept="image/*"
                    @change="onImageChange"
                  />
                </div>

                <!-- Tên công thức -->
                <div class="mb-3">
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Tên công thức"
                    required
                    class="form-control"
                  />
                </div>

                <!-- Nguyên liệu (ckeditor) -->
                <div class="mb-3">
                  <label class="form-label fw-semibold">Nguyên liệu</label>
                  <Ckeditor :editor="editor" v-model="form.ingredients" :config="editorConfig" />
                </div>

                <!-- Hướng dẫn (ckeditor) -->
                <div class="mb-3">
                  <label class="form-label fw-semibold">Hướng dẫn</label>
                  <Ckeditor :editor="editor" v-model="form.instructions" :config="editorConfig" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Hủy</button>
                <button type="submit" class="btn btn-primary">{{ form.id ? 'Cập nhật' : 'Tạo' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Alert -->
      <div v-if="alert.message" :class="['alert mt-4', alert.type === 'success' ? 'alert-success' : 'alert-danger']" role="alert">
        {{ alert.message }}
      </div>

      <!-- Table -->
      <div class="table-responsive card shadow-sm border-1 border-light p-2 mt-4">
        <table class="table table-bordered text-center align-middle">
          <thead class="table-primary">
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Nguyên liệu</th>
              <th>Hướng dẫn</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipe in recipes" :key="recipe.id">
              <td>
                <img v-if="recipe.image_url" :src="recipe.image_url" alt="Ảnh công thức" class="img-thumbnail" style="width: 80px; height: 80px; object-fit: cover;">
                <span v-else>Không có</span>
              </td>
              <td>{{ recipe.name }}</td>
              <td class="text-start text-wrap" style="max-width: 250px;">
                <div>
                  <span v-if="!expandedIngredients.has(recipe.id)">
                    <span v-html="truncateText(recipe.ingredients, 50)"></span>
                    <template v-if="stripHtml(recipe.ingredients).length > 50">
                      <small><a href="#" @click.prevent="toggleIngredients(recipe.id)" class="text-decoration-none"> ...</a></small>
                    </template>
                  </span>
                  <span v-else>
                    <span v-html="recipe.ingredients"></span>
                    <small><a href="#" @click.prevent="toggleIngredients(recipe.id)" class="text-decoration-none">Thu gọn</a></small>
                  </span>
                </div>
              </td>
              <td class="text-start text-wrap" style="max-width: 250px;">
                <div>
                  <span v-if="!expandedInstructions.has(recipe.id)">
                    <span v-html="truncateText(recipe.instructions, 50)"></span>
                    <template v-if="stripHtml(recipe.instructions).length > 50">
                      <small><a href="#" @click.prevent="toggleInstructions(recipe.id)" class="text-decoration-none"> ...</a></small>
                    </template>
                  </span>
                  <span v-else>
                    <span v-html="recipe.instructions"></span>
                    <small><a href="#" @click.prevent="toggleInstructions(recipe.id)" class="text-decoration-none">Thu gọn</a></small>
                  </span>
                </div>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" @click="editRecipe(recipe)">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteRecipe(recipe.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <nav class="d-flex justify-content-center mt-4" aria-label="Page navigation">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="fetchRecipes(1)" :disabled="currentPage === 1">«</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="fetchRecipes(currentPage - 1)" :disabled="currentPage === 1">‹</button>
            </li>

            <li class="page-item disabled">
              <span class="page-link">
                Trang {{ currentPage }} / {{ totalPages }}
              </span>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="fetchRecipes(currentPage + 1)" :disabled="currentPage === totalPages">›</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="fetchRecipes(totalPages)" :disabled="currentPage === totalPages">»</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../Layouts/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const editor = ClassicEditor
const editorConfig = {}

const recipes = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = 10

const alert = ref({ message: '', type: 'success' })
const form = ref({
  id: null,
  name: '',
  ingredients: '',
  instructions: '',
  image_url: ''
})
const isEdit = ref(false)
const showModal = ref(false)
const imagePreview = ref('')

const expandedIngredients = ref(new Set())
const expandedInstructions = ref(new Set())

const showAlert = (message, type = 'success') => {
  alert.value = { message, type }
  setTimeout(() => (alert.value.message = ''), 3000)
}

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
    form.value.image_url = e.target.result
  }
  reader.readAsDataURL(file)
}

const fetchRecipes = async (page = 1) => {
  try {
    const res = await fetch(`/api/recipes?per_page=${perPage}&page=${page}`)
    const data = await res.json()
    recipes.value = data.data
    totalPages.value = Math.ceil(data.total / perPage)
    currentPage.value = page
  } catch (err) {
    showAlert('Lỗi khi tải danh sách!', 'danger')
  }
}

const createOrUpdateRecipe = async () => {
  try {
    let url = '/api/recipes'
    let method = 'POST'
    if (form.value.id) {
      url += `/${form.value.id}`
      method = 'PUT'
    }

    const body = {
      name: form.value.name,
      ingredients: form.value.ingredients,
      instructions: form.value.instructions,
      image_url: form.value.image_url,
    }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (res.ok) {
      showAlert(data.message || 'Thành công!')
      closeModal()
      fetchRecipes(currentPage.value)
    } else {
      showAlert(data.message || 'Có lỗi xảy ra', 'danger')
    }
  } catch (err) {
    showAlert('Lỗi server!', 'danger')
  }
}

const editRecipe = (recipe) => {
  form.value = { ...recipe }
  imagePreview.value = recipe.image_url || ''
  showModal.value = true
}

const deleteRecipe = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa công thức này không?')) return
  try {
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (res.ok) {
      showAlert(data.message || 'Xóa thành công!')
      fetchRecipes(currentPage.value)
    } else {
      showAlert(data.message || 'Xóa thất bại', 'danger')
    }
  } catch {
    showAlert('Lỗi server khi xóa', 'danger')
  }
}

const openModal = () => {
  form.value = {
    id: null,
    name: '',
    ingredients: '',
    instructions: '',
    image_url: ''
  }
  imagePreview.value = ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  imagePreview.value = ''
}

const stripHtml = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

const truncateText = (html, length) => {
  const text = stripHtml(html)
  if (text.length <= length) return html
  return text.substring(0, length)
}

const toggleIngredients = (id) => {
  if (expandedIngredients.value.has(id)) {
    expandedIngredients.value.delete(id)
  } else {
    expandedIngredients.value.add(id)
  }
}

const toggleInstructions = (id) => {
  if (expandedInstructions.value.has(id)) {
    expandedInstructions.value.delete(id)
  } else {
    expandedInstructions.value.add(id)
  }
}

onMounted(() => {
  fetchRecipes()
})
</script>

<style scoped>
.modal {
  z-index: 1050;
}

.table td, .table th {
  vertical-align: middle;
}
</style>
