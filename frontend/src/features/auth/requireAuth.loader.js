import { redirect } from "react-router-dom";
import { apiFetch } from "../../services/api";

export async function requireAuthLoader({ request }) {
  const url = new URL(request.url);
  const publicPaths = ["/login", "/signup"];

  if (publicPaths.includes(url.pathname)) {
    return null;
  }

  try {
    await apiFetch("/api/me");
    return null;
  } catch {
    return redirect("/login");
  }
}
