import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'agent'],
      default: 'agent',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

// Virtual for ID
userSchema.virtual('id').get(function () {
  return this._id.toString()
})

userSchema.set('toJSON', { virtuals: true })

// Hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next()

  try {
    const salt = await bcryptjs.genSalt(12)
    this.passwordHash = await bcryptjs.hash(this.passwordHash, salt)
    next()
  } catch (err) {
    next(err)
  }
})

export default mongoose.model('User', userSchema)
