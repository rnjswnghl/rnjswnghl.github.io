// src/composables/useOpenVidu.ts
import { OpenVidu, Publisher, Session, StreamManager, type SignalOptions } from 'openvidu-browser'
import { ref, shallowReactive, type Ref } from 'vue'
import { useStudyStore } from '@/stores/study'
import { createSession, joinSession as joinSessionAPI } from '@/api/openvidu'

// ===== 상태 =====
export const OV = ref<OpenVidu | null>(null)               // OpenVidu 인스턴스
export const session = ref<Session | null>(null)           // 세션 객체
export const publisher = ref<Publisher | null>(null)       // 내 퍼블리셔(내 카메라/마이크)
export const screenPublisher = ref<Publisher | null>(null) // 화면공유 퍼블리셔
export const subscribers = ref<StreamManager[]>([])        // 구독자 스트림 목록
export const roomId = ref<string | null>(null)             // ✅ 세션 생성 시 받은 roomId

// ===== 이모지(전역 공유) =====
export const emojiMap = shallowReactive<Record<string, string>>({})

/** 2초 후 자동 제거 표시 */
function flashEmoji(userId: string, emoji: string, ms = 2000) {
  emojiMap[userId] = emoji
  window.setTimeout(() => {
    if (emojiMap[userId] === emoji) delete emojiMap[userId]
  }, ms)
}

/** 이모지 수신기 설치 (세션 연결 직후 1회) */
export function initEmojiSignal(sessionRef: Ref<Session | null>) {
  if (!sessionRef.value) return
  const s: any = sessionRef.value
  if (s.__emojiHandlerInstalled) return
  s.__emojiHandlerInstalled = true

  sessionRef.value.on('signal:emoji', (evt: any) => {
    try {
      const data = JSON.parse(evt.data || '{}') as { userId?: string; emoji?: string }
      if (!data.userId || !data.emoji) return
      // 🔑 key 포맷 통일: sender의 userId 를 그대로 key 로 사용
      flashEmoji(String(data.userId), String(data.emoji))
    } catch (e) {
      console.warn('signal:emoji parse error', e)
    }
  })
}

/** 이모지 전송 (내 userId 로 브로드캐스트) */
export async function sendEmojiSignal(userId: string, emoji: string) {
  if (!session.value) return
  const payload = { userId, emoji, ts: Date.now() }
  await session.value.signal({ type: 'emoji', data: JSON.stringify(payload) })
  flashEmoji(userId, emoji)
}

// ===== studyId -> groupId 규칙 =====
// 같은 studyId면 항상 같은 그룹으로 들어가게 보장
export const buildGroupId = (studyId: string) =>
  `FM_${String(studyId).trim().replace(/[^a-zA-Z0-9_-]/g, '_')}`

// ===== 세션 접속 =====
export const joinSession = async (
  token: string,
  userMeta: { userId: string; nickname: string },
  options?: { camOn?: boolean; micOn?: boolean }
) => {
  OV.value = new OpenVidu()
  const newSession = OV.value.initSession()
  session.value = newSession

  // --- 구독자 들어올 때 ---
  newSession.on('streamCreated', (event) => {
    const sub = newSession.subscribe(event.stream, undefined)
    subscribers.value = [...subscribers.value, sub]

    // ✅ 참가자 입장 순서대로 정렬 (connectionId 기준)
    subscribers.value.sort((a, b) => {
      const aId = a.stream?.connection?.connectionId || ''
      const bId = b.stream?.connection?.connectionId || ''
      return aId.localeCompare(bId)
    })

    console.log('🔍 구독자 추가됨:', {
      connectionId: sub.stream?.connection?.connectionId,
      totalSubscribers: subscribers.value.length
    })
  })

  // --- 구독자 나갈 때 ---
  newSession.on('streamDestroyed', (event) => {
    const leaving = event.stream.streamManager
    subscribers.value = subscribers.value.filter((s) => s !== leaving)
  })

  // --- 예외 로깅 ---
  newSession.on('exception', (e) => {
    console.warn('OpenVidu exception:', e)
  })

  try {
    // 1) 세션 연결 : connection.data 에 JSON 문자열로 userId + nickname 저장 (전원에게 동일하게 보임)
    const connData = JSON.stringify({ userId: userMeta.userId, clientData: userMeta.nickname })
    await newSession.connect(token, connData)

    // 2) 퍼블리셔 생성 (항상 true로 만들고 아래에서 초기 상태 반영)
    const pub = await OV.value.initPublisherAsync(undefined, {
      audioSource: undefined,   // default 마이크
      videoSource: undefined,   // default 카메라
      publishAudio: true,
      publishVideo: true,
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
      mirror: false,  // 좌우반전 해결
    })
    publisher.value = pub

    // 3) 세션에 퍼블리시
    await newSession.publish(pub as any)

    // 4) 초기 상태(camOn/micOn) 반영
    publisher.value.publishVideo(options?.camOn ?? true)
    publisher.value.publishAudio(options?.micOn ?? true)
  } catch (error) {
    console.error('🔴 세션 연결 실패:', error)
    throw error
  }
}

// ===== 세션 종료 =====
export const leaveSession = async () => {
  try {
    detachStudySignalListener()
    if (session.value) await session.value.disconnect()
  } catch (err) {
    console.warn('세션 disconnect 에러:', err)
  } finally {
    session.value = null
    OV.value = null
    publisher.value = null
    subscribers.value = []
    roomId.value = null  // ✅ roomId도 초기화
  }
}

// ===== 마이크/카메라 토글 =====
export const setMic = (on: boolean) => publisher.value?.publishAudio(on)
export const setCam = (on: boolean) => publisher.value?.publishVideo(on)

// ===== 새로운 API 구조에 맞는 토큰 발급 =====
export const getToken = async (
  groupId: string,
  meta?: { nickname?: string; isLeader?: boolean }
): Promise<{ token: string; sessionId: string; isLeader: boolean; connectionId: string }> => {
  // 1) 방장인 경우 세션 생성 시도 (이미 존재/서버오류여도 계속 진행)
  if (meta?.isLeader) {
    try {
      const createRes = await createSession(groupId)
      // ✅ roomId 저장 (새로운 API 응답 구조)
      const sessionData = createRes?.data?.data || createRes?.data
      if (sessionData?.roomId) {
        roomId.value = sessionData.roomId
        console.log('✅ 세션 생성 완료, roomId 저장:', roomId.value)
      }
      console.log('✅ 세션 생성 시도 완료')
    } catch (e: any) {
      const status = e?.response?.status
      console.warn('ℹ️ 세션 생성 실패, 이어서 입장 시도:', status, e?.response?.data)
      // 409(이미 존재)나 500(내부 오류)도 그냥 통과해서 join 시도
      if (status && ![409, 500].includes(status)) throw e
    }
  }

  // 2) 세션 입장 (토큰 발급) — 바디로 role/data/isLeader 전달
  const joinRes = await joinSessionAPI(groupId, {
    role: 'PUBLISHER',
    data: meta?.nickname ?? '',
    isLeader: !!meta?.isLeader,
  })

  // 백엔드 응답 파싱: { status, data: { token, sessionId, connectionId, isLeader } }
  const payload = joinRes?.data?.data ?? joinRes?.data
  if (!payload?.token) {
    console.error('🔴 토큰 응답 이상:', joinRes?.data)
    throw new Error('토큰 발급 실패: 응답에 token이 없습니다.')
  }

  const { token, sessionId, connectionId, isLeader } = payload
  console.log('✅ 세션 입장 성공:', { sessionId, connectionId, isLeader })
  return { token, sessionId, connectionId, isLeader: !!isLeader }
}


// ===== studyId만 들고 접속하는 공용 진입점 =====
// Leader/Mate 모두 같은 studyId만 넘기면 같은 그룹으로 들어감.
export const connectByStudyId = async (params: {
  studyId: string
  nickname: string
  userId?: string
  camOn?: boolean
  micOn?: boolean
  isLeader?: boolean
}) => {
  const { studyId, nickname, camOn = true, micOn = true, isLeader = false } = params
  // ✅ buildGroupId 제거: studyId를 그대로 groupId로 사용
  const groupId = studyId

  // 모든 참여자에서 **동일 규칙**으로 userId 생성(혹은 외부에서 주입)
  const userId = params.userId ?? `${nickname}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  const { token, sessionId, isLeader: actualIsLeader } = await getToken(groupId, {
    nickname,
    isLeader,
  })

  // OpenVidu는 wss:// 토큰 전체 문자열을 그대로 요구함.
  await joinSession(token, { userId, nickname }, { camOn, micOn })

  return { sessionId, isLeader: actualIsLeader, userId, groupId }
}

// ===== 닉네임 파서 유틸 =====
export const getNicknameFromStreamManager = (sm: StreamManager): string => {
  try {
    const data: string | undefined = (sm as any)?.stream?.connection?.data
    if (!data) return 'Guest'
    const parsed = JSON.parse(data)
    return parsed?.clientData ?? 'Guest'
  } catch {}
  return 'Guest'
}

/* =========================================================
   👇 스터디 시작/종료 신호 유틸 (버튼용)
========================================================= */
let _studySignalAttached = false
let _studyHandler: ((e: any) => void) | null = null

export const sendStudySignal = async (action: 'start' | 'end') => {
  if (!session.value) return
  const payload = { action, ts: Date.now() }
  const opts: SignalOptions = { type: 'study', data: JSON.stringify(payload) }
  await session.value.signal(opts)
}

export const attachStudySignalListener = () => {
  if (!session.value || _studySignalAttached) return
  const store = useStudyStore()
  _studyHandler = (e: any) => {
    try {
      const { action, ts } = JSON.parse(e.data || '{}')
      if (action === 'start') store.start(ts || Date.now())
      if (action === 'end') store.end(ts || Date.now())
    } catch (err) {
      console.warn('signal:study parse error', err)
    }
  }
  session.value.on('signal:study', _studyHandler)
  _studySignalAttached = true
}

export const detachStudySignalListener = () => {
  if (!session.value || !_studySignalAttached) return
  if (_studyHandler) session.value.off('signal:study', _studyHandler as any)
  _studySignalAttached = false
  _studyHandler = null
}

/* =========================================================
   👇 리더 전용: 늦게 합류한 참가자 동기화
========================================================= */
export const installLeaderLateJoinSync = () => {
  if (!session.value) return
  const store = useStudyStore()

  const resendStartIfLive = async () => {
    if (store.isLive && store.startedAt) {
      try {
        await session.value!.signal({
          type: 'study',
          data: JSON.stringify({ action: 'start', ts: store.startedAt }),
        })
      } catch (e) {
        console.warn('start 재전송 실패', e)
      }
    }
  }

  // 누군가 입장하면 시작 상태 동기화
  session.value.on('connectionCreated', resendStartIfLive)
}
