import {
  getAllAnalytics,
  getEmployeeAnalyticsRows,
  getUserAnalytics,
} from "../repositories/analytics.repo.js";

const ALL_STATUSES = ["WFO", "WFH", "LEAVE", "HOLIDAY"];

function normalize(rows) {
  const result = {};

  // initialize all statuses to 0
  for (const status of ALL_STATUSES) {
    result[status] = 0;
  }

  // fill actual counts
  for (const row of rows) {
    result[row.location] = row.count;
  }

  return result;
}

function normalizeEmployeeRows(rows) {
  const map = {};

  for (const row of rows) {
    if (!map[row.id]) {
      map[row.id] = {
        id: row.id,
        name: row.name,
        email: row.email,
        WFO: 0,
        WFH: 0,
        LEAVE: 0,
        HOLIDAY: 0,
        TOTAL: 0,
      };
    }

    map[row.id][row.location] = row.count;
    map[row.id].TOTAL += row.count;
  }

  return Object.values(map);
}

/**
 * Analytics for logged-in user
 */
export async function getMyAnalytics(user) {
  if (!user?.id) {
    throw new Error("Invalid user context");
  }

  const rows = await getUserAnalytics(user.id);
  return normalize(rows);
}

/**
 * Analytics for all users (manager only)
 */
export async function getGlobalAnalytics(user) {
  if (!user?.role) {
    throw new Error("Invalid user context");
  }

  if (user.role !== "MANAGER") {
    throw new Error("Forbidden");
  }

  const rows = await getAllAnalytics();
  return normalize(rows);
}

/**
 * Global analytics + employee breakdown (manager only)
 * MVP: reused by /summary/all
 */
export async function getGlobalAnalyticsWithEmployees(user) {
  if (!user?.role) {
    throw new Error("Invalid user context");
  }

  if (user.role !== "MANAGER") {
    throw new Error("Forbidden");
  }

  // existing global summary logic
  const summaryRows = await getAllAnalytics();
  const summary = normalize(summaryRows);

  // employee-wise breakdown
  const employeeRows = await getEmployeeAnalyticsRows();
  const employees = normalizeEmployeeRows(employeeRows);

  return { summary, employees };
}
