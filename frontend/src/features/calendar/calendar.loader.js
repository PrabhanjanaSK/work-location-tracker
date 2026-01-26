import { fetchWorkLocations } from "../../services/calendar";

export function calendarLoader() {
  return fetchWorkLocations();
}
