import { fetchAnalytics } from "../../services/analytics";
import { apiFetch } from "../../services/api";

export async function analyticsLoader() {
  const user = await apiFetch("/api/me");

  const path =
    user.role === "MANAGER"
      ? "/api/analytics/summary/all"
      : "/api/analytics/summary";

  return fetchAnalytics(path);
}
