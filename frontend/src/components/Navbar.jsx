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

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.user}>
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
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  )
}
