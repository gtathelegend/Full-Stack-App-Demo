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

export const createLead = async (req, res) => {
  try {
    const { name, email, company, phone, status } = req.body

    // Validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    // Check if email already exists
    const existingLead = await Lead.findOne({ email })
    if (existingLead) {
      return res.status(400).json({ message: 'Lead with this email already exists' })
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      status: status || 'new',
      assignedTo: req.user.id,
    })

    res.status(201).json(lead)
  } catch (err) {
    console.error('Create lead error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params

    const lead = await Lead.findByIdAndDelete(id)
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' })
    }

    res.json({ message: 'Lead deleted successfully' })
  } catch (err) {
    console.error('Delete lead error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body

    // Validation
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      status: status || 'pending',
      dueDate: dueDate || null,
      assignedTo: req.user.id,
    })

    res.status(201).json(task)
  } catch (err) {
    console.error('Create task error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findByIdAndDelete(id)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (err) {
    console.error('Delete task error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
