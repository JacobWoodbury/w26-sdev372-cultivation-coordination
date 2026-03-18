export function apiUrl(path) {
  // In the browser, use the current origin.
  if (typeof window !== "undefined" && window.location?.origin) {
    return new URL(path, window.location.origin).toString();
  }

  // In unit tests / node, fall back to a valid absolute URL.
  return new URL(path, "http://localhost").toString();
}

