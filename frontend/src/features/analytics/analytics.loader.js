import { apiFetch } from "../../services/api";

export async function analyticsLoader() {
  const user = await apiFetch("/api/me");

  if (user.role === "MANAGER") {
    const data = await apiFetch("/api/analytics/summary/all");

    return {
      role: "MANAGER",
      summary: data.summary,
      employees: data.employees,
    };
  }

  const summary = await apiFetch("/api/analytics/summary");

  return {
    role: "EMPLOYEE",
    summary,
    employees: [],
  };
}
