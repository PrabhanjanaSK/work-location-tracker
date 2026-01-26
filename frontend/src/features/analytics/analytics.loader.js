import { fetchAnalytics } from "../../services/analytics";

export function analyticsLoader() {
  return fetchAnalytics();
}
