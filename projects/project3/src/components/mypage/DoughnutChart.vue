<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'

const props = defineProps({
  value: Number
})

// ✅ 반응형 chartData로 변경!
const chartData = computed(() => ({
  labels: ['달성', '미달성'],
  datasets: [
    {
      data: [props.value, 100 - props.value],
      backgroundColor: ['#F48FB1', '#FFE4EC']
    }
  ]
}))

const chartOptions = {
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  }
}
</script>
