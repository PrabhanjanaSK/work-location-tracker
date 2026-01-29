import { loginUser, registerUser } from "../services/auth.service.js";

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

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerUser(email, password, role, name);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}

export async function logout(req, res) {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.sendStatus(204);
}
