const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
const API_BASE_URL = rawBaseUrl ? trimTrailingSlash(rawBaseUrl) : '';

export const apiFetch = (path, options) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;
  return fetch(url, options);
};
