import 'dotenv/config'
import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import User from '../models/User.js'
import Lead from '../models/Lead.js'
import Task from '../models/Task.js'

const seedDatabase = async () => {
  try {
    await connectDB()

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Lead.deleteMany({}),
      Task.deleteMany({}),
    ])

    console.log('Cleared existing data')

    // Create admin user
    const adminPasswordHash = 'Admin@123'
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@demo.com',
      passwordHash: adminPasswordHash,
      role: 'admin',
    })

    console.log('Created admin user')

    // Create sample leads
    const leads = await Lead.insertMany([
      {
        name: 'Sarah Johnson',
        email: 'sarah@acme.com',
        company: 'Acme Corp',
        phone: '+1-555-0101',
        status: 'qualified',
        assignedTo: admin._id,
      },
      {
        name: 'Mark Williams',
        email: 'mark@techco.io',
        company: 'TechCo',
        phone: '+1-555-0102',
        status: 'contacted',
        assignedTo: admin._id,
      },
      {
        name: 'Emma Davis',
        email: 'emma@startup.dev',
        company: 'StartupDev',
        phone: '+1-555-0103',
        status: 'new',
        assignedTo: admin._id,
      },
      {
        name: 'James Brown',
        email: 'james@globalinc.biz',
        company: 'Global Inc',
        phone: '+1-555-0104',
        status: 'lost',
        assignedTo: admin._id,
      },
      {
        name: 'Lisa Chen',
        email: 'lisa@innovations.co',
        company: 'Innovations',
        phone: '+1-555-0105',
        status: 'new',
        assignedTo: admin._id,
      },
    ])

    console.log('Created 5 sample leads')

    // Create sample tasks
    const tasks = await Task.insertMany([
      {
        title: 'Follow up with Acme Corp',
        description: 'Check if they are ready to move forward',
        status: 'completed',
        priority: 'high',
        assignedTo: admin._id,
        dueDate: new Date('2026-03-30'),
      },
      {
        title: 'Prepare Q1 sales report',
        description: 'Quarterly performance analysis',
        status: 'in-progress',
        priority: 'high',
        assignedTo: admin._id,
        dueDate: new Date('2026-04-05'),
      },
      {
        title: 'Update CRM records',
        description: 'Keep customer information up to date',
        status: 'pending',
        priority: 'medium',
        assignedTo: admin._id,
        dueDate: new Date('2026-04-10'),
      },
      {
        title: 'Schedule demo with TechCo',
        description: 'Setup product demo meeting',
        status: 'pending',
        priority: 'high',
        assignedTo: admin._id,
        dueDate: new Date('2026-04-02'),
      },
      {
        title: 'Send onboarding materials',
        description: 'Email onboarding docs to new leads',
        status: 'in-progress',
        priority: 'low',
        assignedTo: admin._id,
        dueDate: new Date('2026-04-15'),
      },
    ])

    console.log('Created 5 sample tasks')

    console.log('\n✅ Database seeded successfully!')
    console.log('\nLogin credentials:')
    console.log('  Email: admin@demo.com')
    console.log('  Password: Admin@123')

    process.exit(0)
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

seedDatabase()
