// hooks/useDownloadFileFromBase64.js
import { useCallback } from 'react';

export function useDownloadFileFromBase64({ source, filename }) {
  const download = useCallback(() => {
    const link = document.createElement('a');
    link.href = source;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [source, filename]);

  return { download };
}
