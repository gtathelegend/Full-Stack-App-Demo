import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import User from '../models/User.js'
import bcryptjs from 'bcryptjs'

const checkUser = async () => {
  try {
    await connectDB()

    console.log('\n🔍 Checking database...\n')

    const user = await User.findOne({ email: 'admin@demo.com' })

    if (!user) {
      console.log('❌ User not found in database!')
      console.log('Total users:', await User.countDocuments())
      process.exit(1)
    }

    console.log('✅ User found!')
    console.log('Name:', user.name)
    console.log('Email:', user.email)
    console.log('Role:', user.role)
    console.log('Password Hash:', user.passwordHash)

    // Test password comparison
    const testPassword = 'Admin@123'
    const isMatch = await bcryptjs.compare(testPassword, user.passwordHash)

    console.log('\n🔐 Password Test:')
    console.log('Testing password "Admin@123"...')
    console.log('Match result:', isMatch ? '✅ PASS' : '❌ FAIL')

    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

checkUser()
