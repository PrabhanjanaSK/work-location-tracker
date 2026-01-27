import { redirect } from "react-router-dom";
import { apiFetch } from "../../services/api";

export async function requireAuthLoader() {
  try {
    const user = await apiFetch("/api/me");
    return { user };
  } catch (err) {
    if (err instanceof Response && err.status === 401) {
      throw redirect("/");
    }
    throw err;
  }
}
