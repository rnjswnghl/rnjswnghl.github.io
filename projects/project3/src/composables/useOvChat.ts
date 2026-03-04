// src/composables/useOvChat.ts
import { ref, onBeforeUnmount } from 'vue'
import type { Session } from 'openvidu-browser'

export interface ChatPeer {
  id: string
  name: string
}

export interface ChatMessage {
  id: string
  fromId: string
  fromName: string
  text: string
  ts: number
  mine: boolean
}

export function useOvChat() {
  const messages = ref<ChatMessage[]>([])

  let attachedSession: Session | null = null
  let me: ChatPeer | null = null
  let handler: ((e: any) => void) | null = null

  // 중복 수신 방지를 위한 seen set
  const seenIds = new Set<string>()

  // 다양한 페이로드 형태를 허용하는 정규화 함수
  function normalizePayload(e: any): ChatMessage | null {
    let raw: any = {}
    try {
      raw = e?.data ? JSON.parse(e.data) : {}
    } catch {
      raw = {}
    }

    // id 생성/획득
    const id: string =
      String(
        raw.id ??
          raw.msgId ??
          `${raw.ts ?? Date.now()}-${Math.floor(Math.random() * 1e6)}`
      )

    // 내 에코(내가 보낸 신호를 다시 받음)면 스킵
    const isEcho =
      !!attachedSession &&
      !!e?.from?.connectionId &&
      !!attachedSession.connection &&
      e.from.connectionId === attachedSession.connection.connectionId
    if (isEcho) {
      // 내가 보낸 id는 이미 로컬로 push 했으니 seen 처리만
      seenIds.add(id)
      return null
    }

    if (seenIds.has(id)) return null

    const fromId: string =
      String(
        raw.fromId ??
          raw.userId ??
          raw.loginId ??
          e?.from?.connectionId ??
          'unknown'
      )

    const fromName: string =
      String(raw.fromName ?? raw.nickname ?? raw.name ?? '익명')

    const text: string = String(raw.text ?? raw.message ?? '')
    const ts: number = Number(raw.ts ?? Date.now())

    return {
      id,
      fromId,
      fromName,
      text,
      ts,
      mine: false,
    }
  }

  function onChat(e: any) {
    const msg = normalizePayload(e)
    if (!msg) return
    seenIds.add(msg.id)
    messages.value.push(msg)
  }

  function attach(s: Session, mePeer: ChatPeer) {
    // 동일 세션에 이미 붙어있으면 identity만 갱신하고 리턴 (중복 리스너 방지)
    if (attachedSession === s && handler) {
      me = mePeer
      return
    }

    // 기존 세션 리스너 해제
    if (attachedSession && handler) {
      try {
        ;(attachedSession as any).off('signal:chat', handler)
      } catch {}
    }

    attachedSession = s
    me = mePeer
    handler = onChat
    s.on('signal:chat', handler)
  }

  function detach() {
    if (attachedSession && handler) {
      try {
        ;(attachedSession as any).off('signal:chat', handler)
      } catch {}
    }
    attachedSession = null
    handler = null
    me = null
  }

  async function send(text: string) {
    const content = String(text ?? '').trim()
    if (!content) return
    if (!attachedSession || !attachedSession.connection || !me) {
      throw new Error('Session not attached')
    }

    const id =
      (globalThis as any).crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.floor(Math.random() * 1e6)}`

    const payload = {
      id,
      fromId: me.id,
      fromName: me.name,
      text: content,
      ts: Date.now(),
    }

    // 낙관적 추가 (즉시 UI 반영)
    seenIds.add(id)
    messages.value.push({ ...payload, mine: true })

    await attachedSession.signal({
      type: 'chat',
      data: JSON.stringify(payload),
    })
  }

  onBeforeUnmount(detach)

  return { messages, attach, detach, send }
}
