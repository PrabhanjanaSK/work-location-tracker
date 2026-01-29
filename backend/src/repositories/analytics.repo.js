import pool from "../db/index.js";

/**
 * Analytics for a single user
 */
export async function getUserAnalytics(userId) {
  const { rows } = await pool.query(
    `
    SELECT location, COUNT(*)::int AS count
    FROM work_locations
    WHERE user_id = $1
    GROUP BY location
    `,
    [userId],
  );

  return rows;
}

/**
 * Analytics across all users (manager)
 */
export async function getAllAnalytics() {
  const { rows } = await pool.query(
    `
    SELECT location, COUNT(*)::int AS count
    FROM work_locations
    GROUP BY location
    `,
  );

  return rows;
}

export async function getEmployeeAnalyticsRows() {
  const { rows } = await pool.query(`
    SELECT
      u.id,
      u.name,
      u.email,
      wl.location,
      COUNT(*)::int AS count
    FROM users u
    JOIN work_locations wl ON wl.user_id = u.id
    GROUP BY u.id, u.name, u.email, wl.location
    ORDER BY u.name
  `);

  return rows;
}
