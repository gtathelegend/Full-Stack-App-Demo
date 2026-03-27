import Lead from '../models/Lead.js'
import Task from '../models/Task.js'
import User from '../models/User.js'

export const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      Lead.find()
        .populate('assignedTo', 'name email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Lead.countDocuments(),
    ])

    res.json({ data, total, page })
  } catch (err) {
    console.error('Get leads error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      Task.find()
        .populate('assignedTo', 'name email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Task.countDocuments(),
    ])

    res.json({ data, total, page })
  } catch (err) {
    console.error('Get tasks error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      User.find()
        .select('-passwordHash')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      User.countDocuments(),
    ])

    res.json({ data, total, page })
  } catch (err) {
    console.error('Get users error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getStats = async (req, res) => {
  try {
    const [totalLeads, totalTasks, totalUsers] = await Promise.all([
      Lead.countDocuments(),
      Task.countDocuments(),
      User.countDocuments(),
    ])

    res.json({ totalLeads, totalTasks, totalUsers })
  } catch (err) {
    console.error('Get stats error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
