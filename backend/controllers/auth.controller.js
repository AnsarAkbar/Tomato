const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const Role = require('../admin/models/roles.model.js');
const bcrypt = require('bcrypt');
  // Generate JWT Token
// Helper function to hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Find role by ID or default to 'customer'
    const foundRole = role
      ? await Role.findById(role)
      : await Role.findOne({ name: 'customer' });
    if (!foundRole) {
      return res.status(400).json({ message: 'Role does not exist' });
    }
    // Create the user
    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
      role: foundRole._id,
    });

    // Populate the role field to get role details
    const populatedUser = await User.findById(user._id).populate('role', 'name');

    // Respond with user details and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: populatedUser.role.name, // Return role name
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  // console.log('---->',req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate({ path: "role", select: "name permissions -_id" })
    console.log('user--->', user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } catch (error) {
    console.log('---->', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify token and get user
exports.verifyToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('🚀', decoded);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.log('error 🚀', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 