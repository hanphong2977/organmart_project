<template>
  <div class="text-start">
    <h2 class="fw-bold mb-3">Doanh thu trong tuần</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
  weeklyRevenue: {
    type: Array,
    default: () => [],
  },
})

// Danh sách thứ từ thứ hai đến chủ nhật
const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']

const chartData = {
  labels: weekDays,
  datasets: [
    {
      label: 'Doanh thu (VNĐ)',
      backgroundColor: '#0d6efd',
      data: weekDays.map(day => {
        const found = props.weeklyRevenue.find(item => item.day === day)
        return found ? found.total : 0
      }),
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>
