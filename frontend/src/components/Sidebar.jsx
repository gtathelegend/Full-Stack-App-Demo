import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'

export const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📊</span>
        <h1 className={styles.logoText}>CRM Demo</h1>
      </div>

      <nav className={styles.nav}>
        <Link
          to="/dashboard"
          className={`${styles.navLink} ${
            location.pathname === '/dashboard' ? styles.active : ''
          }`}
        >
          <span className={styles.icon}>📈</span>
          <span>Dashboard</span>
        </Link>
      </nav>
    </aside>
  )
}
