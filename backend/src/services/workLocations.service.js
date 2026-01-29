import {
  createWorkLocation,
  deleteWorkLocationById,
  getTodayWorkLocations,
  getWorkLocationsByUser,
  updateWorkLocationById,
} from "../repositories/workLocations.repo.js";

const VALID_LOCATIONS = ["WFO", "WFH", "LEAVE", "HOLIDAY"];

export async function listWorkLocations(user) {
  if (!user || !user.id) {
    throw new Error("Invalid user context");
  }

  return getWorkLocationsByUser(user.id);
}

export async function addWorkLocation(userId, workDate, location) {
  if (!userId) throw new Error("userId is required");
  if (!workDate || !location)
    throw new Error("workDate and location are required");

  if (!VALID_LOCATIONS.includes(location)) {
    throw new Error("Invalid location value");
  }

  return createWorkLocation(userId, workDate, location);
}

export async function editWorkLocation(userId, id, location) {
  if (!userId) throw new Error("userId is required");
  if (!id) throw new Error("id is required");

  if (!VALID_LOCATIONS.includes(location)) {
    throw new Error("Invalid location value");
  }

  return updateWorkLocationById(userId, id, location);
}

export async function removeWorkLocation(userId, id) {
  if (!userId) throw new Error("userId is required");
  if (!id) throw new Error("id is required");

  return deleteWorkLocationById(userId, id);
}

export async function getTodayStatusBoard(user) {
  if (!user || user.role !== "MANAGER") {
    throw new Error("Forbidden");
  }

  const today = new Date().toISOString().slice(0, 10);
  const rows = await getTodayWorkLocations(today);

  const board = {
    WFO: [],
    WFH: [],
    LEAVE: [],
    HOLIDAY: [],
    NOT_MARKED: [],
  };

  for (const row of rows) {
    const employee = {
      id: row.id,
      name: row.name,
      email: row.email,
    };

    if (!row.location) {
      board.NOT_MARKED.push(employee);
    } else if (VALID_LOCATIONS.includes(row.location)) {
      board[row.location].push(employee);
    }
  }

  return board;
}
