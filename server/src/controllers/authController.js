import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

const sendUserResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error('Email is already registered');
  }

  const user = await User.create({ name, email, password });
  sendUserResponse(res, 201, user);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  sendUserResponse(res, 200, user);
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
