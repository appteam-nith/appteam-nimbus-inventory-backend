const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const emailSender = require('../utils/emailSender');
const jwtHelper = require('../utils/jwtHelper');
const User = require('../models/User');

// Temporary storage for OTPs during registration
const otpStore = {};

// Step 1: Register and send OTP
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, club } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Generate OTP
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET, // Use a strong secret
      encoding: 'base32',
    });

    // Store OTP temporarily
    otpStore[email] = {
      name,
      password,
      role,
      club,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // OTP valid for 5 minutes
    };

    // Send OTP via email
    await emailSender.sendEmail(
      email,
      'Verify Your Email',
      `Your OTP for registration is: ${otp}. It is valid for 5 minutes.`
    );

    res.status(200).json({ message: 'OTP sent to your email for verification' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Step 2: Verify OTP and create user
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStore[email];
    if (!storedOtp) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    // Check if OTP matches and has not expired
    if (storedOtp.otp !== otp || storedOtp.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(storedOtp.password, 10);
    const newUser = new User({
      name: storedOtp.name,
      email,
      password: hashedPassword,
      role: storedOtp.role,
      club: storedOtp.club,
    });
    await newUser.save();

    // Clear OTP after successful verification
    delete otpStore[email];

    res.status(201).json({ message: 'User registered and verified successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login with 2FA
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwtHelper.signToken({ id: user._id, role: user.role, club: user.club });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

exports.validateToken = (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwtHelper.verifyToken(token);
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
};