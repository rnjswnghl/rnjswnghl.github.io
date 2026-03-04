<template>
  <canvas
    ref="canvas"
    :class="tool === 'eraser' ? 'cursor-none' : ''"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  ></canvas>

  <input
    v-if="tool === 'text' && textInput.visible"
    ref="textField"
    v-model="textInput.value"
    :style="{ top: textInput.y + 'px', left: textInput.x + 'px' }"
    class="text-field"
    @blur="commitText"
    @keyup.enter="commitText"
  />

  <div
    v-if="tool === 'eraser' && showEraser"
    class="eraser-preview"
    :style="{
      top: `${mouseY - eraserSize / 2}px`,
      left: `${mouseX - eraserSize / 2}px`,
      width: `${eraserSize}px`,
      height: `${eraserSize}px`,
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

// props
const props = defineProps<{
  tool: 'pen' | 'eraser' | 'text' | 'shape' | 'color'
  shape: 'rect' | 'circle' | 'triangle' | 'polygon'
  color: string
  eraserSize: number
}>()

// canvas 관련
const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

// 마우스 상태
const mouseX = ref(0)
const mouseY = ref(0)
const showEraser = ref(false)

// 입력 상태
const textInput = ref({ x: 0, y: 0, value: '', visible: false })
const textField = ref<HTMLInputElement | null>(null)

// 데이터 타입 정의
interface ShapeData {
  type: string
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
}
interface PathData {
  points: { x: number; y: number }[]
  color: string
  width: number
}
interface TextData {
  x: number
  y: number
  value: string
  color: string
}

// 저장용 배열
const shapes = ref<ShapeData[]>([])
const paths = ref<PathData[]>([])
const texts = ref<TextData[]>([])
let currentPath: PathData | null = null

// 상태
let drawing = false
let startX = 0
let startY = 0

// 마우스 이벤트 처리
const onMouseDown = (e: MouseEvent) => {
  if (!ctx || !canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  startX = e.clientX - rect.left
  startY = e.clientY - rect.top

  if (props.tool === 'text') {
    textInput.value = { x: startX, y: startY, value: '', visible: true }
    nextTick(() => textField.value?.focus())
    return
  }

  drawing = true

  if (props.tool === 'pen') {
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    currentPath = {
      points: [{ x: startX, y: startY }],
      color: props.color,
      width: 2,
    }
  }
}

const onMouseMove = (e: MouseEvent) => {
  if (!ctx || !canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const currentX = e.clientX - rect.left
  const currentY = e.clientY - rect.top
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  showEraser.value = true

  if (!drawing) {
    if (props.tool === 'eraser') eraseAt(currentX, currentY)
    return
  }

  if (props.tool === 'pen' && currentPath) {
    ctx.lineTo(currentX, currentY)
    ctx.strokeStyle = currentPath.color
    ctx.lineWidth = currentPath.width
    ctx.lineCap = 'round'
    ctx.stroke()
    currentPath.points.push({ x: currentX, y: currentY })
  } else if (props.tool === 'shape') {
    redrawCanvas()
    drawShape(ctx, props.shape, startX, startY, currentX, currentY, props.color)
  }
}

const onMouseUp = (e: MouseEvent) => {
  if (!ctx || !canvas.value || !drawing) return
  drawing = false
  showEraser.value = false

  const rect = canvas.value.getBoundingClientRect()
  const endX = e.clientX - rect.left
  const endY = e.clientY - rect.top

  if (props.tool === 'pen' && currentPath) {
    paths.value.push(currentPath)
    currentPath = null
  } else if (props.tool === 'shape') {
    shapes.value.push({ type: props.shape, x1: startX, y1: startY, x2: endX, y2: endY, color: props.color })
    redrawCanvas()
  }

  ctx.closePath()
}

function eraseAt(x: number, y: number) {
  const radius = props.eraserSize

  paths.value = paths.value.filter(path =>
    !path.points.some(p => Math.hypot(p.x - x, p.y - y) <= radius)
  )
  shapes.value = shapes.value.filter(shape => {
    const cx = (shape.x1 + shape.x2) / 2
    const cy = (shape.y1 + shape.y2) / 2
    return Math.hypot(cx - x, cy - y) > radius
  })
  texts.value = texts.value.filter(text => Math.hypot(text.x - x, text.y - y) > radius)

  redrawCanvas()
}

function commitText() {
  if (!ctx || !textInput.value.value) return
  const { x, y, value } = textInput.value
  texts.value.push({ x, y, value, color: props.color })
  textInput.value.visible = false
  textInput.value.value = ''
  redrawCanvas()
}

function redrawCanvas() {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  for (const p of paths.value) {
    ctx.beginPath()
    const pts = p.points
    if (pts.length > 0) {
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y)
      }
      ctx.strokeStyle = p.color
      ctx.lineWidth = p.width
      ctx.lineCap = 'round'
      ctx.stroke()
    }
  }

  for (const s of shapes.value) {
    drawShape(ctx, s.type, s.x1, s.y1, s.x2, s.y2, s.color)
  }

  for (const t of texts.value) {
    ctx.fillStyle = t.color
    ctx.font = '18px Pretendard'
    ctx.fillText(t.value, t.x, t.y)
  }
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  shapeType: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  shapeColor: string
) {
  const w = x2 - x1
  const h = y2 - y1
  ctx.strokeStyle = shapeColor
  ctx.lineWidth = 2

  switch (shapeType) {
    case 'rect':
      ctx.strokeRect(x1, y1, w, h)
      break
    case 'circle':
      const radius = Math.sqrt(w ** 2 + h ** 2)
      ctx.beginPath()
      ctx.arc(x1, y1, radius, 0, Math.PI * 2)
      ctx.stroke()
      break
    case 'triangle':
      ctx.beginPath()
      ctx.moveTo(x1 + w / 2, y1)
      ctx.lineTo(x1, y1 + h)
      ctx.lineTo(x1 + w, y1 + h)
      ctx.closePath()
      ctx.stroke()
      break
    case 'polygon':
      drawPolygon(x1 + w / 2, y1 + h / 2, Math.min(Math.abs(w), Math.abs(h)) / 2, 6, shapeColor)
      break
  }
}

function drawPolygon(cx: number, cy: number, radius: number, sides: number, shapeColor: string) {
  if (!ctx) return
  const angle = (2 * Math.PI) / sides
  ctx.beginPath()
  ctx.strokeStyle = shapeColor
  for (let i = 0; i < sides; i++) {
    const x = cx + radius * Math.cos(i * angle - Math.PI / 2)
    const y = cy + radius * Math.sin(i * angle - Math.PI / 2)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()
}

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    ctx = canvas.value.getContext('2d')
  }
})
</script>

<style scoped>
canvas {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100% - 80px);
  background: white;
}
.text-field {
  position: absolute;
  font-size: 16px;
  font-family: Pretendard, sans-serif;
  border: 1px solid #aaa;
  padding: 4px;
  z-index: 10002;
  background: white;
}
.cursor-none {
  cursor: none;
}
.eraser-preview {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  border: 1px dashed gray;
}
</style>
