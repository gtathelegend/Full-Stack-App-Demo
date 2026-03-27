import { useEffect } from 'react'
import styles from './Toast.module.css'

export const Toast = ({ id, message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 3000)

    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert">
      <div className={styles.content}>
        {type === 'success' && <span className={styles.icon}>✓</span>}
        {type === 'error' && <span className={styles.icon}>✕</span>}
        {type === 'info' && <span className={styles.icon}>ℹ</span>}
        <p className={styles.message}>{message}</p>
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => onClose(id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  )
}
