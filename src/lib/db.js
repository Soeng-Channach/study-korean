import { openDB } from 'idb';

const DB_NAME = 'topik-ii-learning';
const DB_VERSION = 1;

export async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('learning')) {
        db.createObjectStore('learning');
      }
    }
  });
}

export async function readLearningState(key, fallback) {
  try {
    const db = await getDb();
    const value = await db.get('learning', key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function writeLearningState(key, value) {
  try {
    const db = await getDb();
    await db.put('learning', value, key);
  } catch {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
