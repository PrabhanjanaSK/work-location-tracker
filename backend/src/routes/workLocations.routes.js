import express from "express";
import {
  createWorkLocation,
  deleteWorkLocation,
  getTodayStatusBoardController,
  getWorkLocations,
  updateWorkLocation,
} from "../controllers/workLocations.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.route("/today-board").get(getTodayStatusBoardController);

router.route("/").get(getWorkLocations).post(createWorkLocation);

router.route("/:id").put(updateWorkLocation).delete(deleteWorkLocation);

export default router;
