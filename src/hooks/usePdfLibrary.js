import { useCallback, useEffect, useState } from 'react';
import { addPdf, deletePdf, listPdfs } from '../lib/db';

export function usePdfLibrary() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await listPdfs();
      setItems(list);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const upload = useCallback(
    async (file) => {
      if (!file) return null;
      if (file.type && file.type !== 'application/pdf') {
        throw new Error('Only PDF files can be uploaded.');
      }
      const meta = await addPdf(file);
      await refresh();
      return meta;
    },
    [refresh]
  );

  const remove = useCallback(
    async (id) => {
      await deletePdf(id);
      await refresh();
    },
    [refresh]
  );

  return { items, loading, error, upload, remove, refresh };
}
