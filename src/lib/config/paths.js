/** App is deployed under /50points (see next.config.mjs). */

export const BASE_PATH = '/50points';

/** Use with next/image and next/link — basePath is applied automatically. */
export function asset(path) {
  return path.startsWith('/') ? path : `/${path}`;
}

/** Use with fetch() for API routes from the browser. */
export function api(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Use with plain <img> tags (browser needs the full public URL). */
export function staticFile(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withBase = normalized.startsWith(BASE_PATH) ? normalized : `${BASE_PATH}${normalized}`;
  return encodeURI(withBase);
}
