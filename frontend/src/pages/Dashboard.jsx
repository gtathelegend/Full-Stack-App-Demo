import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import api from '../api/axios'
import styles from './Dashboard.module.css'

export const Dashboard = () => {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [stats, setStats] = useState({ totalLeads: 0, totalTasks: 0, totalUsers: 0 })
  const [leads, setLeads] = useState([])
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  // Modal states
  const [showAddLead, setShowAddLead] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', phone: '' })
  const [leadError, setLeadError] = useState('')
  const [taskForm, setTaskForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '' })
  const [taskError, setTaskError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchData = async () => {
    try {
      setLoadError(null)
      const [statsRes, leadsRes, tasksRes, usersRes] = await Promise.allSettled([
        api.get('/dashboard/stats'),
        api.get('/dashboard/leads?limit=5'),
        api.get('/dashboard/tasks?limit=5'),
        api.get('/dashboard/users?limit=5'),
      ])

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data.data)
      }
      if (leadsRes.status === 'fulfilled') {
        setLeads(leadsRes.value.data.data)
      }
      if (tasksRes.status === 'fulfilled') {
        setTasks(tasksRes.value.data.data)
      }
      if (usersRes.status === 'fulfilled') {
        setUsers(usersRes.value.data.data)
      } else if (usersRes.status === 'rejected' && usersRes.reason.response?.status === 403) {
        setUsers([])
      } else if (usersRes.status === 'rejected') {
        console.warn('Failed to fetch users:', usersRes.reason)
      }

      if (statsRes.status === 'rejected' || leadsRes.status === 'rejected' || tasksRes.status === 'rejected') {
        const failedRequest = [statsRes, leadsRes, tasksRes].find(r => r.status === 'rejected')
        const errorMsg = failedRequest.reason.response?.data?.message || 'Failed to fetch data'
        setLoadError(errorMsg)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch data'
      setLoadError(errorMsg)
      console.error('Failed to fetch data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const validateLeadForm = () => {
    if (!leadForm.name.trim()) {
      setLeadError('Name is required')
      return false
    }
    if (!leadForm.email.trim()) {
      setLeadError('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(leadForm.email)) {
      setLeadError('Invalid email format')
      return false
    }
    setLeadError('')
    return true
  }

  const handleCreateLead = async (e) => {
    e.preventDefault()
    if (!validateLeadForm()) return

    setIsSubmitting(true)
    try {
      const res = await api.post('/dashboard/leads', leadForm)
      setLeads([res.data.data, ...leads])
      setStats({ ...stats, totalLeads: stats.totalLeads + 1 })
      setLeadForm({ name: '', email: '', company: '', phone: '' })
      setShowAddLead(false)
      showToast('Lead created successfully', 'success')
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create lead'
      setLeadError(errorMsg)
      showToast(errorMsg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    try {
      await api.delete(`/dashboard/leads/${id}`)
      setLeads(leads.filter((l) => l._id !== id))
      setStats({ ...stats, totalLeads: stats.totalLeads - 1 })
      showToast('Lead deleted successfully', 'success')
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete lead'
      showToast(errorMsg, 'error')
    }
  }

  const validateTaskForm = () => {
    if (!taskForm.title.trim()) {
      setTaskError('Title is required')
      return false
    }
    setTaskError('')
    return true
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (!validateTaskForm()) return

    setIsSubmitting(true)
    try {
      const res = await api.post('/dashboard/tasks', taskForm)
      setTasks([res.data.data, ...tasks])
      setStats({ ...stats, totalTasks: stats.totalTasks + 1 })
      setTaskForm({ title: '', description: '', priority: 'medium', dueDate: '' })
      setShowAddTask(false)
      showToast('Task created successfully', 'success')
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create task'
      setTaskError(errorMsg)
      showToast(errorMsg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await api.delete(`/dashboard/tasks/${id}`)
      setTasks(tasks.filter((t) => t._id !== id))
      setStats({ ...stats, totalTasks: stats.totalTasks - 1 })
      showToast('Task deleted successfully', 'success')
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete task'
      showToast(errorMsg, 'error')
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.main}>
          <Navbar title="Dashboard" />
          <div className={styles.content}>
            <div className={styles.errorContainer}>
              <h2>Unable to load dashboard</h2>
              <p>{loadError}</p>
              <button className={styles.retryBtn} onClick={fetchData}>
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const leadColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'company', label: 'Company' },
    { key: 'status', label: 'Status', type: 'badge', badgeType: 'lead' },
    { key: 'assignedTo', label: 'Assigned To', type: 'reference', refField: 'name' },
  ]

  const taskColumns = [
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority', type: 'badge', badgeType: 'priority' },
    { key: 'status', label: 'Status', type: 'badge', badgeType: 'task' },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
    { key: 'assignedTo', label: 'Assigned To', type: 'reference', refField: 'name' },
  ]

  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Joined', type: 'date' },
  ]

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar title="Dashboard" />
        <div className={styles.content}>
          <div className={styles.greeting}>
            <h1>Good to see you, {user?.name}</h1>
            <p>Here's a quick overview of your workspace</p>
          </div>

          <div className={styles.stats}>
            <StatCard label="Leads" count={stats.totalLeads} />
            <StatCard label="Tasks" count={stats.totalTasks} />
            <StatCard
              label="Users"
              count={['admin', 'manager'].includes(user?.role) ? stats.totalUsers : users.length || 1}
            />
          </div>

          <div className={styles.tables}>
            <div className={styles.tableHeader}>
              <h3>Recent Leads</h3>
              <button className={styles.addBtn} onClick={() => setShowAddLead(true)}>
                Add Lead
              </button>
            </div>
            <DataTable title="" columns={leadColumns} data={leads} onDelete={handleDeleteLead} />

            <div className={styles.tableHeader}>
              <h3>Recent Tasks</h3>
              <button className={styles.addBtn} onClick={() => setShowAddTask(true)}>
                Add Task
              </button>
            </div>
            <DataTable title="" columns={taskColumns} data={tasks} onDelete={handleDeleteTask} />

            <DataTable title="Team Members" columns={userColumns} data={users} />
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      <Modal isOpen={showAddLead} onClose={() => setShowAddLead(false)} title="Add New Lead">
        <form onSubmit={handleCreateLead} className={styles.form}>
          {leadError && (
            <div className={styles.errorMessage}>{leadError}</div>
          )}
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              className="form-input"
              value={leadForm.name}
              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              disabled={isSubmitting}
              placeholder="John Smith"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className="form-input"
              value={leadForm.email}
              onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
              disabled={isSubmitting}
              placeholder="john@company.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Company</label>
            <input
              type="text"
              className="form-input"
              value={leadForm.company}
              onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
              disabled={isSubmitting}
              placeholder="Acme Corp"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="tel"
              className="form-input"
              value={leadForm.phone}
              onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
              disabled={isSubmitting}
              placeholder="+1 555 123 4567"
            />
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                setShowAddLead(false)
                setLeadError('')
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Lead'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Task Modal */}
      <Modal isOpen={showAddTask} onClose={() => setShowAddTask(false)} title="Add New Task">
        <form onSubmit={handleCreateTask} className={styles.form}>
          {taskError && (
            <div className={styles.errorMessage}>{taskError}</div>
          )}
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              className="form-input"
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              disabled={isSubmitting}
              placeholder="Follow up with client"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className="form-input"
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              rows="3"
              disabled={isSubmitting}
              placeholder="Add any additional notes..."
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Priority</label>
            <select
              className="form-input"
              value={taskForm.priority}
              onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
              disabled={isSubmitting}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Due Date</label>
            <input
              type="date"
              className="form-input"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                setShowAddTask(false)
                setTaskError('')
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
