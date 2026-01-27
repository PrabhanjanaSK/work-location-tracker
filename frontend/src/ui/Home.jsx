import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Work Location Tracker</h1>

        <p className={styles.subtitle}>
          A simple way to track where work happens.
        </p>
      </section>

      {/* Navigation cards */}
      <section className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Calendar</h3>
          <p className={styles.cardText}>
            Update daily work locations and review past entries in a clear
            calendar view.
          </p>
          <Link to="/work-locations" className={styles.cardLink}>
            Go to Calendar →
          </Link>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Analytics</h3>
          <p className={styles.cardText}>
            View summarized insights into work patterns across time.
          </p>
          <Link to="/analytics" className={styles.cardLink}>
            View Analytics →
          </Link>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Profile</h3>
          <p className={styles.cardText}>
            View your account details and role information.
          </p>
          <Link to="/profile" className={styles.cardLink}>
            Open Profile →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
