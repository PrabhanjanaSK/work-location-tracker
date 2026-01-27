import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      navigate("/login");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h1 className={styles.title}>Work Location Tracker</h1>

          <nav className={styles.nav} aria-label="Primary navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/work-locations"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Calendar
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Analytics
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Profile
            </NavLink>
          </nav>
        </div>
      </div>

      <button
        className={styles.logout}
        onClick={handleLogout}
        aria-label="Log out of your account"
      >
        Logout
      </button>
    </header>
  );
}
