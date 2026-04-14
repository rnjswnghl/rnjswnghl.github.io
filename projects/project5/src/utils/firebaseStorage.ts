import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';
import * as FileSystem from 'expo-file-system/legacy';

export const getRecordingPath = (userId: string, sessionId: string, scriptId: string | number, count: number) => {
  return `users/${userId}/sessions/${sessionId}/recordings/rec_${userId}_${sessionId}_${scriptId}_${count}.mp3`;
};

export const getReferenceAudioPath = (category: string, scriptId: string | number) => {
  return `scripts/${category}/${scriptId}/reference_${category}_${scriptId}.mp3`;
};

export const getScriptVisualizationPath = (category: string, scriptId: string | number) => {
  return `scripts/${category}/${scriptId}/viz_${category}_${scriptId}.json`;
};

export async function uploadFileToFirebase(
  localUri: string,
  storagePath: string
): Promise<string> {
  try {
    const storageRef = ref(storage, storagePath);
    
    
    const response = await fetch(localUri);
    const blob = await response.blob();
    
    
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        () => resolve()
      );
    });
    
    
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw error;
  }
}

export async function deleteFileFromFirebase(storagePath: string): Promise<void> {
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error: any) {
    
    if (error?.code !== 'storage/object-not-found') {
      throw error;
    }
  }
}

export async function deleteExistingFiles(
  userId: string,
  sessionId: string,
  scriptId: string | number,
  count: number
): Promise<void> {
  try {
    const recordingPath = getRecordingPath(userId, sessionId, scriptId, count);
    await deleteFileFromFirebase(recordingPath);
  } catch (error) {
    
  }
}

export async function uploadRecordingFile(
  localUri: string,
  userId: string,
  sessionId: string,
  scriptId: string | number,
  count: number
): Promise<string> {
  const storagePath = getRecordingPath(userId, sessionId, scriptId, count);
  return uploadFileToFirebase(localUri, storagePath);
}

export async function getFileDownloadUrl(storagePath: string): Promise<string | null> {
  try {
    const storageRef = ref(storage, storagePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error: any) {
    
    if (error?.code === 'storage/object-not-found') {
      return null;
    }
    throw error;
  }
}

export async function getReferenceAudioUrl(category: string, scriptId: string | number): Promise<string | null> {
  const storagePath = getReferenceAudioPath(category, scriptId);
  return getFileDownloadUrl(storagePath);
}

export async function getScriptVisualizationData(category: string, scriptId: string | number): Promise<any | null> {
  try {
    const storagePath = getScriptVisualizationPath(category, scriptId);
    const url = await getFileDownloadUrl(storagePath);
    
    if (!url) return null;
    
    
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
