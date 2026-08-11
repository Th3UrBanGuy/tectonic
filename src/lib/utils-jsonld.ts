/**
 * Safe JSON serialization for use in dangerouslySetInnerHTML.
 * Escapes </script> sequences to prevent XSS via JSON-LD injection.
 */
export function safeJsonLd(data: Record<string, any>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}
