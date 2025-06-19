<template>
  <AdminLayout>
    <template #default>
      <div class="container">
        <!-- Thống kê -->
        <div class="row mb-4">
            <!-- Tổng Doanh Thu -->
            <div class="col-md-4 mb-3">
                <div class="card text-center border-primary">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title text-muted mb-0">Tổng Doanh Thu(30 ngày)</h5>
                        <i class="bi bi-currency-exchange fs-1 text-primary"></i>
                    </div>
                    <p class="card-text fw-bold fs-3 text-primary text-start">
                        {{ formatCurrency(stats.total_revenue) }}
                    </p>
                </div>
                </div>
            </div>

            <!-- Tổng Đơn Hàng -->
            <div class="col-md-4 mb-3">
                <div class="card text-center border-success">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title text-muted mb-0">Tổng Đơn Hàng(30 ngày)</h5>
                        <i class="bi bi-bag-check fs-1 text-success"></i>
                    </div>
                    <p class="card-text fw-bold fs-3 text-success text-start">{{ stats.orders_count }}</p>
                </div>
                </div>
            </div>

            <!-- Người dùng không có role -->
            <div class="col-md-4 mb-3">
                <div class="card text-center border-warning">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-muted mb-0">Người dùng</h5>
                            <i class="bi bi-person fs-1 text-warning"></i>
                        </div>
                        <p class="card-text fw-bold fs-3 text-warning text-start">{{ stats.users_count }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Biểu đồ doanh thu -->
        <div class="card">
          <div class="card-body">
            <WeeklyRevenueChart :weeklyRevenue="stats.weekly_revenue" style="height: 400px;" />
          </div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../Layouts/AdminLayout.vue'
import WeeklyRevenueChart from '../../Components/Charts/DailyRevenueChart.vue'

const props = defineProps({
  stats: Object,
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

</script>
