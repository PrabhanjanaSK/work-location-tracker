import { apiFetch } from "./api";

export function fetchWorkLocations() {
  return apiFetch("/api/work-locations");
}

export function fetchTodayBoard() {
  return apiFetch("/api/work-locations/today-board");
}
