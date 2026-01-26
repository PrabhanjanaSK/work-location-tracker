import { fetchProfile } from "../../services/profile";

export function profileLoader() {
  return fetchProfile();
}
