import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

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

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.user}>
        <button
          onClick={handleProfileClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div className={styles.avatar}>
            {user?.name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.name}>{user?.name}</p>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </button>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  )
}
