import { redirect } from "react-router-dom";
import { apiFetch } from "../../services/api";

export async function signupAction({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        role: "EMPLOYEE",
      }),
    });

    return redirect("/login");
  } catch (err) {
    return err;
  }
}
