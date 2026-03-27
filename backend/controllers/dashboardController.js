import Lead from '../models/Lead.js'
import Task from '../models/Task.js'
import User from '../models/User.js'

export const getLeads = async (req, res, next) => {
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

    res.json({
      success: true,
      data,
      pagination: { total, page, limit },
      message: 'Leads retrieved successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const getTasks = async (req, res, next) => {
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

    res.json({
      success: true,
      data,
      pagination: { total, page, limit },
      message: 'Tasks retrieved successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const getUsers = async (req, res, next) => {
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

    res.json({
      success: true,
      data,
      pagination: { total, page, limit },
      message: 'Users retrieved successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const getStats = async (req, res, next) => {
  try {
    const [totalLeads, totalTasks, totalUsers] = await Promise.all([
      Lead.countDocuments(),
      Task.countDocuments(),
      User.countDocuments(),
    ])

    res.json({
      success: true,
      data: { totalLeads, totalTasks, totalUsers },
      message: 'Stats retrieved successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const createLead = async (req, res, next) => {
  try {
    const { name, email, company, phone, status } = req.body

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      })
    }

    // Check if email already exists
    const existingLead = await Lead.findOne({ email })
    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: 'Lead with this email already exists',
      })
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      status: status || 'new',
      assignedTo: req.user.id,
    })

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead created successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, company, phone, status } = req.body

    // Validate at least one field is being updated
    if (!name && !email && !company && !phone && !status) {
      return res.status(400).json({
        success: false,
        message: 'At least one field must be provided for update',
      })
    }

    // Check if new email is already taken by another lead
    if (email) {
      const existingLead = await Lead.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      })
      if (existingLead) {
        return res.status(409).json({
          success: false,
          message: 'Email is already in use',
        })
      }
    }

    const updateData = {}
    if (name) updateData.name = name.trim()
    if (email) updateData.email = email.trim().toLowerCase()
    if (company !== undefined) updateData.company = company?.trim() || ''
    if (phone !== undefined) updateData.phone = phone?.trim() || ''
    if (status) updateData.status = status

    const lead = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      })
    }

    res.json({
      success: true,
      data: lead,
      message: 'Lead updated successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params

    const lead = await Lead.findByIdAndDelete(id)
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      })
    }

    res.json({
      success: true,
      data: lead,
      message: 'Lead deleted successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, dueDate } = req.body

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      })
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      status: status || 'pending',
      dueDate: dueDate || null,
      assignedTo: req.user.id,
    })

    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, priority, status, dueDate } = req.body

    // Validate at least one field is being updated
    if (!title && !description && !priority && !status && !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'At least one field must be provided for update',
      })
    }

    const updateData = {}
    if (title) updateData.title = title.trim()
    if (description !== undefined) updateData.description = description?.trim() || ''
    if (priority) updateData.priority = priority
    if (status) updateData.status = status
    if (dueDate !== undefined) updateData.dueDate = dueDate

    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    res.json({
      success: true,
      data: task,
      message: 'Task updated successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params

    const task = await Task.findByIdAndDelete(id)
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    res.json({
      success: true,
      data: task,
      message: 'Task deleted successfully',
    })
  } catch (err) {
    next(err)
  }
}
