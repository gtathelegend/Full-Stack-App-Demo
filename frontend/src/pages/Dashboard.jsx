import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
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

  useEffect(() => {
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

    fetchData()
  }, [])

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
            <DataTable title="Recent Leads" columns={leadColumns} data={leads} />
            <DataTable title="Recent Tasks" columns={taskColumns} data={tasks} />
            <DataTable title="Team Members" columns={userColumns} data={users} />
          </div>
        </div>
      </div>
    </div>
  )
}
