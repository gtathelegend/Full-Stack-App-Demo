import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import api from '../api/axios'
import styles from './Dashboard.module.css'

export const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validatePasswordForm = () => {
    if (!passwordForm.currentPassword) {
      setError('Current password is required')
      return false
    }
    if (!passwordForm.newPassword) {
      setError('New password is required')
      return false
    }
    if (passwordForm.newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    setError('')
    return true
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!validatePasswordForm()) return

    setIsSubmitting(true)
    try {
      await api.patch('/auth/profile/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      showToast('Password changed successfully', 'success')
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to change password'
      setError(errorMsg)
      showToast(errorMsg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar title="Profile" />
        <div className={styles.content}>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>User Information</h2>
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Name
                  </label>
                  <p style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937' }}>
                    {user?.name}
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Email
                  </label>
                  <p style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937' }}>
                    {user?.email}
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Role
                  </label>
                  <p style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937' }}>
                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'}
                  </p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Member Since
                  </label>
                  <p style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937' }}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Change Password</h2>
              <form onSubmit={handleChangePassword} className={styles.form}>
                {error && (
                  <div style={{
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    backgroundColor: '#fee2e2',
                    color: '#7f1d1d',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}>
                    {error}
                  </div>
                )}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => navigate('/dashboard')}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
