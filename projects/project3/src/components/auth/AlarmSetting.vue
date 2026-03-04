<template>
  <div class="alarm-setting mt-4">
    <label class="form-label">알림 설정</label>

    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="emailAlarm"
        v-model="email"
      />
      <label class="form-check-label" for="emailAlarm">
        이메일로 스터디 일정 알림 받기
      </label>
    </div>

    <div class="form-check mt-2">
      <input
        class="form-check-input"
        type="checkbox"
        id="pushAlarm"
        v-model="push"
      />
      <label class="form-check-label" for="pushAlarm">
        웹사이트(푸시)로 알림 받기
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const email = ref(props.modelValue.email)
const push = ref(props.modelValue.push)

watch([email, push], () => {
  emit('update:modelValue', {
    email: email.value,
    push: push.value,
  })
})
</script>

<style scoped>
.alarm-setting {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}
</style>
