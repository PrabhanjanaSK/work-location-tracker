import { Form, useActionData, useNavigation } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Work Location Tracker</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        <Form method="post" className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>

          {error?.error && (
            <p className={styles.error} role="alert">
              {error.error}
            </p>
          )}
        </Form>
      </div>
    </main>
  );
}

export default Login;
