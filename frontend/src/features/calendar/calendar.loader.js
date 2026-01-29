import { apiFetch } from "../../services/api";
import { fetchTodayBoard, fetchWorkLocations } from "../../services/calendar";

export async function calendarLoader() {
  const workLocations = await fetchWorkLocations();
  const user = await apiFetch("/api/me");

  let todayBoard = null;

  if (user.role === "MANAGER") {
    todayBoard = await fetchTodayBoard();
  }

  return {
    workLocations,
    role: user.role,
    todayBoard,
  };
}
