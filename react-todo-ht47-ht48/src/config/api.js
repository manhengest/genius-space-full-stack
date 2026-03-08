/**
 * API base URL - uses VITE_API_URL in production (Render), localhost for dev
 */
export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3030";
