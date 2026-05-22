import { openDB } from 'idb';

const DB_NAME = 'topik-ii-learning';
const DB_VERSION = 2;

export async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (!db.objectStoreNames.contains('learning')) {
        db.createObjectStore('learning');
      }
      if (oldVersion < 2 && !db.objectStoreNames.contains('pdfs')) {
        const store = db.createObjectStore('pdfs', { keyPath: 'id' });
        store.createIndex('addedAt', 'addedAt');
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

function makePdfId() {
  return `pdf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function listPdfs() {
  try {
    const db = await getDb();
    const entries = await db.getAll('pdfs');
    return entries
      .map(({ blob, ...meta }) => meta)
      .sort((a, b) => b.addedAt - a.addedAt);
  } catch {
    return [];
  }
}

export async function addPdf(file) {
  const db = await getDb();
  const entry = {
    id: makePdfId(),
    name: file.name,
    size: file.size,
    mimeType: file.type || 'application/pdf',
    addedAt: Date.now(),
    blob: file
  };
  await db.put('pdfs', entry);
  const { blob, ...meta } = entry;
  return meta;
}

export async function getPdf(id) {
  try {
    const db = await getDb();
    return await db.get('pdfs', id);
  } catch {
    return null;
  }
}

export async function deletePdf(id) {
  const db = await getDb();
  await db.delete('pdfs', id);
}

const PRACTICE_KEY_PREFIX = 'practice:';

export async function getPracticeState(pdfId) {
  try {
    const db = await getDb();
    return (await db.get('learning', `${PRACTICE_KEY_PREFIX}${pdfId}`)) ?? null;
  } catch {
    return null;
  }
}

export async function setPracticeState(pdfId, state) {
  try {
    const db = await getDb();
    await db.put('learning', state, `${PRACTICE_KEY_PREFIX}${pdfId}`);
  } catch {
    /* swallow */
  }
}
