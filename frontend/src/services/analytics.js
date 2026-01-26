import { apiFetch } from "./api";

export function fetchAnalytics() {
  return apiFetch("/api/analytics/summary");
}
