import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import styles from "./Login.module.css";

function Signup() {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Sign up to continue</p>

        <Form method="post" className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            <input name="name" type="text" required />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input name="email" type="email" required />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input name="password" type="password" required />
          </div>

          <div className={styles.field}>
            <label>Confirm Password</label>
            <input name="confirmPassword" type="password" required />
          </div>

          <button disabled={isSubmitting} className={styles.button}>
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>

          {error?.error && <p className={styles.error}>{error.error}</p>}
        </Form>

        <p className={styles.footerText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
