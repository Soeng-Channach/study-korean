import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';

export function usePageMeta(title, description) {
  useEffect(() => {
    setPageMeta(title, description);
  }, [title, description]);
}
