import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    zipcode: { type: String, trim: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model('User', userSchema);

export default User;
