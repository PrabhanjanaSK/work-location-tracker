import { apiFetch } from "./api";

export function fetchProfile() {
  return apiFetch("/api/me");
}
