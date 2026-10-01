// ClassVault IndexedDB Media & Video Storage Engine with JSON Data Backup & Restore

const DB_NAME = 'ClassVault_MediaDB'
const DB_VERSION = 1
const STORE_VIDEOS = 'lecture_videos'

/**
 * Open or initialize the IndexedDB instance for storing large video files
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser environment'))
      return
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_VIDEOS)) {
        db.createObjectStore(STORE_VIDEOS, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Save a raw video file or blob directly into IndexedDB without hitting localStorage limits
 */
export async function saveVideoToDB(id, fileOrBlob, metadata = {}) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_VIDEOS, 'readwrite')
      const store = tx.objectStore(STORE_VIDEOS)

      const record = {
        id,
        blob: fileOrBlob,
        name: metadata.name || fileOrBlob.name || `${id}.mp4`,
        size: metadata.size || fileOrBlob.size || 0,
        type: metadata.type || fileOrBlob.type || 'video/mp4',
        duration: metadata.duration || 'Lecture Session',
        class_id: metadata.class_id || '',
        uploaded_at: new Date().toISOString(),
      }

      const req = store.put(record)
      req.onsuccess = () => resolve(record)
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.error('Failed to store video in IndexedDB:', err)
    throw err
  }
}

/**
 * Retrieve a stored video Blob from IndexedDB
 */
export async function getVideoBlobFromDB(id) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_VIDEOS, 'readonly')
      const store = tx.objectStore(STORE_VIDEOS)
      const req = store.get(id)

      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          resolve(req.result.blob)
        } else {
          resolve(null)
        }
      }
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn(`Could not load video ${id} from IndexedDB:`, err)
    return null
  }
}

/**
 * Get an active blob URL for video playback
 */
export async function getVideoUrlFromDB(id) {
  const blob = await getVideoBlobFromDB(id)
  if (blob) {
    return URL.createObjectURL(blob)
  }
  return null
}

/**
 * Delete a video file from IndexedDB to free space
 */
export async function deleteVideoFromDB(id) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_VIDEOS, 'readwrite')
      const store = tx.objectStore(STORE_VIDEOS)
      const req = store.delete(id)
      req.onsuccess = () => resolve(true)
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.error('Failed to delete video from IndexedDB:', err)
    return false
  }
}

/**
 * List all saved video records in IndexedDB
 */
export async function listSavedVideosFromDB() {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_VIDEOS, 'readonly')
      const store = tx.objectStore(STORE_VIDEOS)
      const req = store.getAll()
      req.onsuccess = () => {
        const results = (req.result || []).map((r) => ({
          id: r.id,
          name: r.name,
          size: r.size,
          type: r.type,
          duration: r.duration,
          class_id: r.class_id,
          uploaded_at: r.uploaded_at,
        }))
        resolve(results)
      }
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn('Could not list videos from IndexedDB:', err)
    return []
  }
}

/**
 * Estimate browser storage quota and usage
 */
export async function getStorageEstimate() {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
    try {
      const { usage, quota } = await navigator.storage.estimate()
      const usageMB = (usage / (1024 * 1024)).toFixed(1)
      const quotaMB = (quota / (1024 * 1024)).toFixed(0)
      const percent = quota ? Math.min(100, Math.round((usage / quota) * 100)) : 0
      return { usageMB, quotaMB, percent }
    } catch {
      return { usageMB: '0.0', quotaMB: 'Unlimited', percent: 0 }
    }
  }
  return { usageMB: '0.0', quotaMB: 'Unlimited', percent: 0 }
}

/**
 * Export full application database into a downloadable JSON backup
 */
export function exportVaultBackup({ teachers, students, classes, topics, topicProgress, contents }) {
  const backupPayload = {
    app: 'ClassVault',
    version: '2.0.0',
    export_timestamp: new Date().toISOString(),
    institution: 'Kristu Jayanti College (Autonomous)',
    schema: {
      tables: ['teachers', 'students', 'classes', 'topics', 'topicProgress', 'contents'],
    },
    data: {
      teachers: teachers || [],
      students: students || [],
      classes: classes || [],
      topics: topics || [],
      topicProgress: topicProgress || [],
      contents: contents || [],
    },
  }

  const jsonString = JSON.stringify(backupPayload, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const dateStr = new Date().toISOString().slice(0, 10)
  const filename = `classvault_full_backup_${dateStr}.json`

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)

  return filename
}

/**
 * Parse and validate an uploaded backup file
 */
export function parseBackupFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided for restore'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)
        if (!parsed.data || typeof parsed.data !== 'object') {
          reject(new Error('Invalid ClassVault backup format: missing "data" key'))
          return
        }

        const { classes, topics, contents } = parsed.data
        if (!Array.isArray(classes) && !Array.isArray(contents)) {
          reject(new Error('Invalid backup structure: expected classes or contents arrays'))
          return
        }

        resolve(parsed.data)
      } catch (err) {
        reject(new Error(`Failed to parse backup JSON: ${err.message}`))
      }
    }
    reader.onerror = () => reject(new Error('Error reading backup file'))
    reader.readAsText(file)
  })
}
