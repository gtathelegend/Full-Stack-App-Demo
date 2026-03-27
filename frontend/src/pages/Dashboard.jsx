import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useAuth } from '../hooks/useAuth'
import api from '../api/axios'
import styles from './Dashboard.module.css'

export const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ totalLeads: 0, totalTasks: 0, totalUsers: 0 })
  const [leads, setLeads] = useState([])
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Modal states
  const [showAddLead, setShowAddLead] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', phone: '' })
  const [taskForm, setTaskForm] = useState({ title: '', description: '', priority: 'medium' })

  const fetchData = async () => {
    try {
      const [statsRes, leadsRes, tasksRes, usersRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/leads?limit=5'),
        api.get('/dashboard/tasks?limit=5'),
        api.get('/dashboard/users?limit=5'),
      ])

      setStats(statsRes.data)
      setLeads(leadsRes.data.data)
      setTasks(tasksRes.data.data)
      setUsers(usersRes.data.data)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateLead = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/dashboard/leads', leadForm)
      setLeads([res.data, ...leads])
      setStats({ ...stats, totalLeads: stats.totalLeads + 1 })
      setLeadForm({ name: '', email: '', company: '', phone: '' })
      setShowAddLead(false)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create lead')
    }
  }

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    try {
      await api.delete(`/dashboard/leads/${id}`)
      setLeads(leads.filter((l) => l._id !== id))
      setStats({ ...stats, totalLeads: stats.totalLeads - 1 })
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete lead')
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/dashboard/tasks', taskForm)
      setTasks([res.data, ...tasks])
      setStats({ ...stats, totalTasks: stats.totalTasks + 1 })
      setTaskForm({ title: '', description: '', priority: 'medium' })
      setShowAddTask(false)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create task')
    }
  }

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await api.delete(`/dashboard/tasks/${id}`)
      setTasks(tasks.filter((t) => t._id !== id))
      setStats({ ...stats, totalTasks: stats.totalTasks - 1 })
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task')
    }
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="spinner"></div>
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
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Here's what's happening in your CRM today.</p>
          </div>

          <div className={styles.stats}>
            <StatCard icon="🎯" label="Leads" count={stats.totalLeads} />
            <StatCard icon="✅" label="Tasks" count={stats.totalTasks} />
            <StatCard icon="👥" label="Users" count={stats.totalUsers} />
          </div>

          <div className={styles.tables}>
            <div className={styles.tableHeader}>
              <h3>Recent Leads</h3>
              <button className={styles.addBtn} onClick={() => setShowAddLead(true)}>
                + Add Lead
              </button>
            </div>
            <DataTable title="" columns={leadColumns} data={leads} onDelete={handleDeleteLead} />

            <div className={styles.tableHeader}>
              <h3>Recent Tasks</h3>
              <button className={styles.addBtn} onClick={() => setShowAddTask(true)}>
                + Add Task
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
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              className="form-input"
              value={leadForm.name}
              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className="form-input"
              value={leadForm.email}
              onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Company</label>
            <input
              type="text"
              className="form-input"
              value={leadForm.company}
              onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="tel"
              className="form-input"
              value={leadForm.phone}
              onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
            />
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setShowAddLead(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Create Lead
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Task Modal */}
      <Modal isOpen={showAddTask} onClose={() => setShowAddTask(false)} title="Add New Task">
        <form onSubmit={handleCreateTask} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              className="form-input"
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className="form-input"
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              rows="3"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Priority</label>
            <select
              className="form-input"
              value={taskForm.priority}
              onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setShowAddTask(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
