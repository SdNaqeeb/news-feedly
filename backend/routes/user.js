const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' }); // User not found

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' }); // Incorrect password

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3600s' });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input and check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'Email already exists' }); // Email taken

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  try {
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;