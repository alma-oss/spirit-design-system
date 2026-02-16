'use client';

import { useEffect, useState } from 'react';

/**
 * Returns a blob object URL for the given file when it is an image (`file.type` includes `"image"`),
 * or an empty string for non-image files. Use this when you have a `File` and need a URL for a
 * thumbnail (e.g. in a custom attachment UI outside the queue flow).
 *
 * The URL is created with `URL.createObjectURL` and is automatically revoked on unmount or when
 * the `file` reference changes, so no manual cleanup is required.
 *
 * @param file - The file to create a preview URL for.
 * @returns {string} The object URL string for image files, or `""` for non-image files.
 */
export const useFilePreviewUrl = (file: File): string => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (file.size === 0 || !file.type) {
      setUrl('');

      return;
    }

    if (!file.type.includes('image')) {
      setUrl('');

      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return url;
};
