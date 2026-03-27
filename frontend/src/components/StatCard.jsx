import styles from './StatCard.module.css'

export const StatCard = ({ icon, label, count, trend }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p className={styles.count}>{count}</p>
        {trend && <p className={styles.trend}>{trend}</p>}
      </div>
    </div>
  )
}
