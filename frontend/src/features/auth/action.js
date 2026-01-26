// src/actions/auth.actions.js
import { redirect } from "react-router-dom";
import { login } from "../../services/login";

export async function loginAction({ request }) {
  const formData = await request.formData();

  await login({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  return redirect("/profile");
}
