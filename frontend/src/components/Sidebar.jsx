import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'

// Logo icon
const LogoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
)

// Dashboard icon
const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1"/>
    <rect x="14" y="3" width="7" height="5" rx="1"/>
    <rect x="14" y="12" width="7" height="9" rx="1"/>
    <rect x="3" y="16" width="7" height="5" rx="1"/>
  </svg>
)

export const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>
          <LogoIcon />
        </div>
        <h1 className={styles.logoText}>Dashboard</h1>
      </div>

      <nav className={styles.nav}>
        <Link
          to="/dashboard"
          className={`${styles.navLink} ${
            location.pathname === '/dashboard' ? styles.active : ''
          }`}
        >
          <span className={styles.navIcon}>
            <DashboardIcon />
          </span>
          <span>Overview</span>
        </Link>
      </nav>
    </aside>
  )
}
