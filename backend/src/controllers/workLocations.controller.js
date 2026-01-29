import {
  addWorkLocation,
  editWorkLocation,
  getTodayStatusBoard,
  listWorkLocations,
  removeWorkLocation,
} from "../services/workLocations.service.js";

export async function getWorkLocations(req, res) {
  try {
    const userId = await req.user.id;
    const data = await listWorkLocations(req.user);
    res.json(data);
  } catch (err) {
    console.error("GET /work-locations failed:", err);
    res.status(500).json({ error: "Failed to fetch work locations" });
  }
}

export async function createWorkLocation(req, res) {
  try {
    const userId = await req.user.id;
    const { workDate, location } = req.body;

    const record = await addWorkLocation(userId, workDate, location);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateWorkLocation(req, res) {
  try {
    const userId = await req.user.id;

    const { id } = req.params;
    const { location } = req.body;

    const record = await editWorkLocation(userId, id, location);
    if (!record) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteWorkLocation(req, res) {
  try {
    const userId = await req.user.id;

    const { id } = req.params;

    const deleted = await removeWorkLocation(userId, id);
    if (!deleted) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getTodayStatusBoardController(req, res) {
  try {
    const board = await getTodayStatusBoard(req.user);
    res.json(board);
  } catch (err) {
    if (err.message === "Forbidden") {
      return res.status(403).json({ error: "Forbidden" });
    }
    res.status(400).json({ error: err.message });
  }
}
