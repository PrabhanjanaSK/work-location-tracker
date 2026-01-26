import { apiFetch } from "./api";

export function fetchWorkLocations() {
  return apiFetch("/api/work-locations");
}
