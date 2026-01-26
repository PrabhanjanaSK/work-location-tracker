import { Form } from "react-router-dom";

function Login() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>

      <Form method="post">
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <br />
          <input name="email" type="email" required autoComplete="email" />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </Form>
    </div>
  );
}

export default Login;
