import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css' // Reuse dashboard styles for consistency

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          color: '#3b82f6',
          marginBottom: '1rem'
        }}>
          404
        </div>
        <h1 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Page Not Found</h1>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.125rem' }}>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className={styles.submitBtn}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}
