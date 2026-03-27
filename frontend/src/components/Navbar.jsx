import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

// Logout icon SVG
const LogoutIcon = () => (
  <svg 
    className={styles.logoutIcon}
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

export const Navbar = ({ title }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.user}>
        <button
          onClick={handleProfileClick}
          className={styles.userButton}
        >
          <div className={styles.avatar}>
            {getInitials(user?.name)}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.name}>{user?.name}</p>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </button>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogoutIcon />
          <span>Sign out</span>
        </button>
      </div>
    </nav>
  )
}
