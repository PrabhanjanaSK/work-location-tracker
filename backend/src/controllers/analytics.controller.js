import {
  getGlobalAnalyticsWithEmployees,
  getMyAnalytics,
} from "../services/analytics.service.js";

/**
 * GET /api/analytics/summary
 */
export async function mySummary(req, res) {
  try {
    const data = await getMyAnalytics(req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * GET /api/analytics/summary/all
 * Manager-only (MVP: includes employee breakdown)
 */
export async function allSummary(req, res) {
  try {
    const data = await getGlobalAnalyticsWithEmployees(req.user);
    res.json(data);
  } catch (err) {
    if (err.message === "Forbidden") {
      return res.status(403).json({ error: "Forbidden" });
    }
    res.status(400).json({ error: err.message });
  }
}
