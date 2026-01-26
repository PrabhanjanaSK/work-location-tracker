import { loginUser, registerUser } from "../services/auth.service.js";

/**
 * POST /api/auth/login
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      // secure: true
    });

    res.json({ user });
  } catch (err) {
    res.status(401).json({
      error: "Invalid email or password",
    });
  }
}

/**
 * POST /api/auth/register
 * DEV / INTERNAL USE ONLY (can be removed later)
 */
export async function register(req, res) {
  try {
    const { email, password, role } = req.body;

    const user = await registerUser(email, password, role);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}
