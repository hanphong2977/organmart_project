<template>
  <div class="d-flex vh-100">
    <!-- Sidebar -->
    <div
      :class="['bg-white border-end shadow-sm', isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed']"
      class="d-flex flex-column align-items-center pt-4 position-relative"
    >
      <!-- Logo -->
      <a href="/admin" class="mb-4 d-flex justify-content-center w-100 cursor-pointer">
        <img src="/images/logo.png" alt="Logo" class="logo-img" />
      </a>

      <!-- Menu -->
      <ul class="nav nav-pills flex-column text-start w-100 px-2">
        <li class="nav-item mb-2" v-for="item in menuItems" :key="item.text">
          <!-- Main menu -->
          <template v-if="!item.children">
            <a
              :href="item.href"
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              @click.prevent="selectMenuItem(item)"
              :title="!isSidebarOpen ? item.text : ''"
              :class="{ 'active text-primary': currentMenu === item.text }"
            >
              <i :class="item.icon + ' me-2 fs-5'" :style="{ color: currentMenu === item.text ? '#0d6efd' : '#212529' }"></i>
              <span v-if="isSidebarOpen" :class="currentMenu === item.text ? 'text-primary' : 'text-dark'">{{ item.text }}</span>
            </a>
          </template>

          <!-- With submenu -->
          <template v-else>
            <div
              class="nav-link d-flex align-items-center justify-content-between cursor-pointer"
              @click="toggleSubmenu(item.text)"
              :class="{ 'text-primary': isSubmenuOpen(item.text) }"
            >
              <div class="d-flex align-items-center">
                <i :class="item.icon + ' me-2 fs-5'" :style="{ color: isSubmenuOpen(item.text) ? '#0d6efd' : '#212529' }"></i>
                <span v-if="isSidebarOpen" :class="isSubmenuOpen(item.text) ? 'text-primary' : 'text-dark'">{{ item.text }}</span>
              </div>
              <i class="bi" v-if="isSidebarOpen" :class="isSubmenuOpen(item.text) ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </div>

            <!-- Submenu -->
            <ul v-show="isSidebarOpen && isSubmenuOpen(item.text)" class="nav flex-column ps-3 mt-1">
              <li class="nav-item" v-for="sub in item.children" :key="sub.text">
                <a
                  :href="sub.href"
                  class="nav-link d-flex align-items-center"
                  @click.prevent="selectMenuItem(sub)"
                  :title="!isSidebarOpen ? sub.text : ''"
                  :class="{ 'active text-primary': currentMenu === sub.text }"
                >
                  <i :class="sub.icon + ' me-2'" :style="{ color: currentMenu === sub.text ? '#0d6efd' : '#212529' }"></i>
                  <span v-if="isSidebarOpen" :class="currentMenu === sub.text ? 'text-primary' : 'text-dark'">{{ sub.text }}</span>
                </a>
              </li>
            </ul>
          </template>
        </li>
      </ul>

      <!-- Toggle Button -->
      <button @click="toggleSidebar" class="btn btn-outline-secondary btn-sm mt-auto mb-3">
        <i class="bi" :class="isSidebarOpen ? 'bi-chevron-left' : 'bi-chevron-right'"></i>
      </button>
    </div>

    <!-- Main content -->
    <div class="flex-grow-1 d-flex flex-column">
      <header class="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
        <h5 class="mb-0">{{ currentMenu }}</h5>
        <div class="d-flex align-items-center">
          <button @click="logout" class="btn btn-outline-danger btn-sm d-flex align-items-center">
            <i class="bi bi-box-arrow-right me-1"></i>
          </button>
        </div>
      </header>

      <main class="p-4 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Inertia } from '@inertiajs/inertia'
import api from '../api'

const isSidebarOpen = ref(true)
const openSubmenus = ref([])

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const menuItems = [
  { text: 'Dashboard', href: '/admin', icon: 'bi bi-speedometer2' },
  { text: 'Danh Mục', href: '/categories', icon: 'bi bi-grid' },
  { text: 'Sản Phẩm', href: '/products', icon: 'bi bi-box-seam' },
  { text: 'Đơn Hàng', href: '/orders', icon: 'bi bi-bag-check' },
  { text: 'Thực Đơn', href: '/recipes', icon: 'bi bi-journal-text' },
  {
    text: 'Cài đặt',
    icon: 'bi bi-gear',
    children: [
      { text: 'Người dùng', href: '/users', icon: 'bi bi-person' },
    ]
  }
]

const page = usePage()
const currentUrl = computed(() => {
  try {
    if (page.url) {
      const url = new URL(page.url, window.location.origin)
      return url.pathname.toLowerCase()
    }
    return window.location.pathname.toLowerCase()
  } catch {
    return window.location.pathname.toLowerCase()
  }
})

const normalizePath = path => path.replace(/\/+$/, '').toLowerCase()

const currentMenu = computed(() => {
  const currPath = normalizePath(currentUrl.value)

  for (const item of menuItems) {
    if (item.children) {
      const matchedChild = item.children.find(child =>
        currPath === normalizePath(child.href) || currPath.startsWith(normalizePath(child.href) + '/')
      )
      if (matchedChild) return matchedChild.text
    } else {
      if (normalizePath(item.href) === currPath || currPath.startsWith(normalizePath(item.href) + '/')) {
        return item.text
      }
    }
  }

  return 'Dashboard'
})

const toggleSubmenu = (itemText) => {
  const index = openSubmenus.value.indexOf(itemText)
  if (index === -1) {
    openSubmenus.value.push(itemText)
  } else {
    openSubmenus.value.splice(index, 1)
  }
}

const isSubmenuOpen = (itemText) => openSubmenus.value.includes(itemText)

const selectMenuItem = (item) => {
  if (item.href && item.href !== '#') {
    Inertia.visit(item.href)
  }
}

const logout = async () => {
  try {
    await api.post('/logout')
    Inertia.visit('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
.sidebar-open {
  width: 200px;
  transition: width 0.3s ease;
}
.sidebar-collapsed {
  width: 80px;
  transition: width 0.3s ease;
}
.logo-img {
  width: 50%;
  height: auto;
  object-fit: contain;
}
.cursor-pointer {
  cursor: pointer;
}
.nav-link.active {
  background-color: #e6f4ff;
  font-weight: 600;
}
.nav-link {
  transition: background-color 0.2s;
}
.nav-link:hover {
  background-color: #f8f9fa;
}
main {
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
}
</style>
