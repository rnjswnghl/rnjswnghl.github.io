<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

// 💡 차트 데이터 정의
const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{
    label: '스터디 시간',
    data: props.data,
    backgroundColor: '#A3D5F7', // 부드러운 베이비 블루
    hoverBackgroundColor: '#81C3D7', // 살짝 진한 블루
    borderRadius: 8,
    barThickness: 20
  }]
}))

// 💡 차트 옵션 정의
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: '#FFFFFF',
      borderColor: '#A3D5F7',
      borderWidth: 1,
      titleColor: '#333',
      bodyColor: '#555',
      titleFont: { weight: 'bold' }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#555',
        font: { weight: '600' }
      },
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      max: 4,
      ticks: {
        stepSize: 1,
        color: '#555'
      },
      grid: {
        color: '#f0f0f0'
      }
    }
  }
}
</script>
