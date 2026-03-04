// src/types/mediapipe-selfie-segmentation.d.ts
export {}

declare global {
  interface Window {
    SelfieSegmentation: new (opts: { locateFile: (file: string) => string }) => {
      setOptions: (opts: Record<string, unknown>) => void
      onResults: (
        cb: (results: {
          image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
          segmentationMask: HTMLImageElement | HTMLCanvasElement
          [key: string]: unknown
        }) => void
      ) => void
      send: (input: { image: HTMLVideoElement | HTMLCanvasElement }) => Promise<void>
    }
  }
}
