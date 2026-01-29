import { useLoaderData } from "react-router-dom";
import styles from "./Analytics.module.css";

function Analytics() {
  const { role, summary, employees } = useLoaderData();

  const stats = [
    { key: "WFO", label: "Work From Office", className: styles.wfo },
    { key: "WFH", label: "Work From Home", className: styles.wfh },
    { key: "LEAVE", label: "Leave", className: styles.leave },
    { key: "HOLIDAY", label: "Holiday", className: styles.holiday },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.subtitle}>
          {role === "MANAGER"
            ? "Team-wide work location overview"
            : "Your work location overview"}
        </p>
      </div>

      {/* Compact summary cards (shared for both roles) */}
      <div className={styles.summaryRow}>
        {stats.map(({ key, label, className }) => (
          <div key={key} className={`${styles.summaryCard} ${className}`}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{summary[key]}</span>
          </div>
        ))}
      </div>

      {/* Manager-only section */}
      {role === "MANAGER" && (
        <section className={styles.tableSection}>
          <h2 className={styles.sectionTitle}>Employee Breakdown</h2>

          {employees.length === 0 ? (
            <p className={styles.emptyState}>
              Employee-wise analytics will appear here.
            </p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>WFO</th>
                  <th>WFH</th>
                  <th>Leave</th>
                  <th>Holiday</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className={styles.empName}>{emp.name}</div>
                      <div className={styles.empEmail}>{emp.email}</div>
                    </td>
                    <td>{emp.WFO}</td>
                    <td>{emp.WFH}</td>
                    <td>{emp.LEAVE}</td>
                    <td>{emp.HOLIDAY}</td>
                    <td className={styles.total}>{emp.TOTAL}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
}

export default Analytics;
