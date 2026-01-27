import { useLoaderData } from "react-router-dom";
import styles from "./Analytics.module.css";

function Analytics() {
  const data = useLoaderData();

  const stats = [
    { key: "WFO", label: "Work From Office", className: styles.wfo },
    { key: "WFH", label: "Work From Home", className: styles.wfh },
    { key: "LEAVE", label: "Leave", className: styles.leave },
    { key: "HOLIDAY", label: "Holiday", className: styles.holiday },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.subtitle}>Overview of tracked work locations</p>
      </div>

      <div className={styles.cards}>
        {stats.map(({ key, label, className }) => (
          <div key={key} className={`${styles.card} ${className}`}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{data[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
