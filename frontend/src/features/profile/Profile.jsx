import { useLoaderData } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
  const user = useLoaderData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Name</span>
          <span className={styles.value}>{user.name}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user.email}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Role</span>
          <span className={styles.value}>{user.role}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
