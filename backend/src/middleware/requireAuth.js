import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export function requireAuth(req, res, next) {
  // 1️⃣ Read token from cookie
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 2️⃣ Verify token
    const payload = jwt.verify(token, JWT_SECRET);

    // 3️⃣ Attach user to request
    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
