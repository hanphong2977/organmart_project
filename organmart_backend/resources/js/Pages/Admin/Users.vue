<template>
    <AdminLayout>
        <div class="container py-4">
            <div
                class="shadow-sm border border-1 border-light d-flex justify-content-between align-items-center mb-4 p-3">
                <h1 class="h4 fw-bold">Quản lý Người dùng</h1>
                <button class="btn btn-primary" @click="openModal">Thêm người dùng</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal d-block" style="background: rgba(0,0,0,0.5)">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form @submit.prevent="submitForm">
                            <div class="modal-header">
                                <h5 class="modal-title">{{ form.id ? 'Cập nhật người dùng' : 'Tạo người dùng' }}</h5>
                                <button type="button" class="btn-close" @click="closeModal"></button>
                            </div>
                            <div class="modal-body">
                                <input v-model="form.username" placeholder="Username" class="form-control mb-3"
                                    required />
                                <input v-model="form.email" type="email" placeholder="Email" class="form-control mb-3"
                                    required />
                                <input v-model="form.phone" placeholder="Số điện thoại" class="form-control mb-3"
                                    required />
                                <input v-model="form.password" type="password" placeholder="Mật khẩu"
                                    class="form-control mb-3" :required="!form.id" />
                                <select v-model="form.role" class="form-select mb-3" required>
                                    <option value="">-- Chọn vai trò --</option>
                                    <option v-for="role in roles" :key="role.name" :value="role.name">
                                        {{ role.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" type="button" @click="closeModal">Hủy</button>
                                <button class="btn btn-primary" type="submit">{{ form.id ? 'Cập nhật' : 'Tạo'
                                    }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="table-responsive shadow-sm border border-1 border-light p-2">
                <table class="table table-bordered text-center align-middle">
                    <thead class="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users.data" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone || 'Chưa có' }}</td>
                            <td>{{ user.roles?.[0]?.name || 'Chưa có' }}</td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary me-2" @click="editUser(user)">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <nav class="d-flex justify-content-center mt-4">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: !users.prev_page_url }">
                            <button class="page-link" @click="changePage(users.current_page - 1)">‹</button>
                        </li>
                        <li class="page-item disabled">
                            <span class="page-link">Trang {{ users.current_page }} / {{ users.last_page }}</span>
                        </li>
                        <li class="page-item" :class="{ disabled: !users.next_page_url }">
                            <button class="page-link" @click="changePage(users.current_page + 1)">›</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'
import { router } from '@inertiajs/inertia'
import AdminLayout from '../../Layouts/AdminLayout.vue'

const props = defineProps({
    users: Object,
    roles: Array,
})

const showModal = ref(false)

const form = useForm({
    id: null,
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '',
})

const openModal = () => {
    form.reset()
    form.clearErrors()
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const editUser = (user) => {
    form.id = user.id
    form.username = user.username
    form.email = user.email
    form.phone = user.phone
    form.password = ''
    form.role = user.roles?.[0]?.name || ''
    showModal.value = true
}

const submitForm = () => {
    if (form.id) {
        form.put(`/users/${form.id}`, {
            onSuccess: () => {
                closeModal()
                router.reload() // <-- Reload lại trang sau khi thành công
            },
            onError: (errors) => {
                alert('Lỗi: ' + Object.values(errors).join(', '))
                router.reload() // <-- Reload lại trang ngay cả khi có lỗi
            }
        })
    } else {
        form.post('/users', {
            onSuccess: () => closeModal(),
            onError: (errors) => alert('Lỗi: ' + Object.values(errors).join(', '))
        })
    }
}

const deleteForm = useForm({})
const deleteUser = (id) => {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
        deleteForm.delete(`/users/${id}`, {
            onSuccess: () => {
                alert('Đã xóa thành công!')
                router.reload() // <-- Reload lại trang sau khi thành công
            },
            onError: (errors) => {
                alert('Lỗi: ' + Object.values(errors).join(', '))
                router.reload() // <-- Reload lại trang ngay cả khi có lỗi
            }
        })
    }
}

const changePage = (page) => {
    router.get('/users', { page }, { preserveState: true, preserveScroll: true })
}
</script>
