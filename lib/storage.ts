import { ProfileConfig } from "./profile";

const DB_NAME = "niteen_profile_db";
const DB_VERSION = 1;
const STORE_NAME = "media_store";
const SETTINGS_KEY = "niteen_profile_settings";

interface MediaRecord {
  id: string;
  blob: Blob;
  mimeType: string;
  filename: string;
  updatedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB not available"));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveMediaFile(id: string, file: File): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const record: MediaRecord = {
      id,
      blob: file,
      mimeType: file.type,
      filename: file.name,
      updatedAt: Date.now(),
    };
    const req = store.put(record);
    req.onsuccess = () => {
      const url = URL.createObjectURL(file);
      resolve(url);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getMediaUrl(id: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          const url = URL.createObjectURL(req.result.blob);
          resolve(url);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function clearMediaRecord(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // Ignore error
  }
}

export function saveSettingsToLocal(settings: Partial<ProfileConfig>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save settings to localStorage", err);
  }
}

export function loadSettingsFromLocal(): Partial<ProfileConfig> | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(SETTINGS_KEY);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function clearAllLocalCustomizations(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SETTINGS_KEY);
    clearMediaRecord("custom_background");
    clearMediaRecord("custom_cursor");
    clearMediaRecord("custom_profile");
  } catch {
    // Ignore
  }
}
