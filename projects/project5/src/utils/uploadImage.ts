import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../config/firebase'

export async function uploadImageToFirebase(
  imageUri: string,
  folder: string = 'profiles',
  fileName?: string,
  metadata?: { userId?: string; originalFileName?: string; [key: string]: any },
): Promise<string> {
  try {
    const response = await fetch(imageUri)
    const blob = await response.blob()

    const timestamp = Date.now()
    const finalFileName = fileName || `${timestamp}.jpg`
    const storageRef = ref(storage, `${folder}/${finalFileName}`)

    const uploadMetadata: { contentType?: string; customMetadata?: Record<string, string> } = {
      contentType: blob.type || 'image/jpeg',
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        timestamp: String(timestamp),
        fileSize: String(blob.size),
        folder,
        ...(metadata?.userId ? { uploadedBy: String(metadata.userId) } : {}),
        ...(metadata?.originalFileName
          ? { originalFileName: String(metadata.originalFileName) }
          : {}),
        ...Object.keys(metadata || {}).reduce((acc, key) => {
          if (key === 'userId' || key === 'originalFileName') return acc
          const v = (metadata as any)?.[key]
          if (v === undefined || v === null) return acc
          acc[key] = String(v)
          return acc
        }, {} as Record<string, string>),
      },
    }

    const uploadTask = uploadBytesResumable(storageRef, blob, uploadMetadata)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          reject(error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          } catch (error) {
            reject(error)
          }
        },
      )
    })
  } catch (error) {
    throw error
  }
}

export async function deleteImageFromFirebase(imageUrl: string): Promise<void> {
  try {
    if (!imageUrl) {
      return
    }

    if (!imageUrl.includes('firebasestorage.googleapis.com')) {
      return
    }

    let filePath: string
    try {
      const url = new URL(imageUrl)
      const pathMatch = url.pathname.match(/\/o\/(.+?)(\?|$)/)

      if (pathMatch && pathMatch[1]) {
        filePath = decodeURIComponent(pathMatch[1])
      } else {
        return
      }
    } catch (error) {
      return
    }

    const imageRef = ref(storage, filePath)
    await deleteObject(imageRef)
  } catch (error: any) {
    throw error
  }
}

export async function uploadProfileImage(
  imageUri: string,
  userId: string,
): Promise<string> {
  const imageExtension = imageUri.toLowerCase().endsWith('.png') ? 'png' : 'jpg'
  const fileName = `profile_${userId}.${imageExtension}`
  const folder = `users/${userId}/profile`

  return uploadImageToFirebase(imageUri, folder, fileName, {
    userId,
    imageType: 'profile',
  })
}
