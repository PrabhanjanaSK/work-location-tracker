import "dotenv/config";

import cookieparser from "cookie-parser";
import cors from "cors";
import express from "express";
import { requireAuth } from "./middleware/requireAuth.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import authRoutes from "./routes/auth.routes.js";
import meRoutes from "./routes/me.routes.js";
import workLocationRoutes from "./routes/workLocations.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie-parser MUST come before any auth-protected routes
app.use(cookieparser());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use("/api/work-locations", workLocationRoutes);

app.use("/api/analytics", analyticsRoutes);

// requireAuth MUST be applied here
app.use("/api/me", requireAuth, meRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
