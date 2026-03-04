<template>
  <div class="member-panel">
    <ul class="member-list">
      <li
        v-for="(m, i) in normalizedMembers"
        :key="m.userId || i"
        class="member-row"
      >
        <div class="left">
          <span class="name">{{ m.nickname }}</span>
          <span class="badges">
            <span v-if="m.isSelf" class="me">ME</span>
          </span>
        </div>

        <div class="right">
          <span class="badge" :class="{ off: !m.micOn }">
            <i v-if="m.micOn" class="fi fi-sr-volume"></i>
            <i v-else class="fi fi-sr-volume-slash"></i>
          </span>
          <span class="badge" :class="{ off: !m.cameraOn }">
            <i v-if="m.cameraOn" class="fi fi-rr-webcam"></i>
            <i v-else class="fi fi-rr-webcam-slash"></i>
          </span>
          <button
            v-if="isLeader && !m.isSelf && !m.cameraOn && m.userId"
            class="request-btn"
            @click="emitRequest(m.userId!)"
          >
            카메라 켜기 요청
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface MemberItem {
  userId?: string
  nickname: string
  cameraOn: boolean
  micOn: boolean
  isSelf?: boolean
}

const props = defineProps<{
  isLeader: boolean
  members: MemberItem[]
}>()

const emit = defineEmits<{
  (e: 'request-camera', userId: string): void
}>()

/** props.members가 isSelf를 안 넣어줘도 안전하게 동작하도록 정규화 */
const normalizedMembers = computed<MemberItem[]>(() =>
  (props.members || []).map(m => ({
    userId: m.userId,
    nickname: m.nickname,
    cameraOn: !!m.cameraOn,
    micOn: !!m.micOn,
    isSelf: !!m.isSelf,
  }))
)

function emitRequest(userId?: string) {
  if (!userId) return
  emit('request-camera', userId)
}
</script>

<style scoped>
.member-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.member-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.member-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d6dee5;
  border-radius: 8px;
  background: #fff;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.name {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.badges {
  display: inline-flex;
  align-items: center;
  gap: 0.1rem;
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.1);
  margin: 0 2px;
  padding: 0;
}

.badge i {
  font-size: 12px;
  color: #4caf50;
}

.badge.off {
  background: rgba(255, 107, 107, 0.1);
}

.badge.off i {
  color: #ff6b6b;
}

.right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.me {
  margin-left: 0.35rem;
  font-size: 0.75rem;
  background: #6db3f2;
  color: #fff;
  border-radius: 6px;
  padding: 0.05rem 0.35rem;
}

.right .request-btn {
  border: none;
  background: #6db3f2;
  color: #fff;
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
}

.right .request-btn:hover {
  filter: brightness(0.95);
}
</style>
