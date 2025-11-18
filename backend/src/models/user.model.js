import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,  // Remove whitespace  (e.g. "  user  " -> "user")
    minLength: 3,
    maxLength: 30,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
    password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 128,
  },
}, {
  timestamps: true,
}); 

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
  }
  

export const User = mongoose.model('User', userSchema);