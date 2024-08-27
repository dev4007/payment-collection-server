import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user (Salesman or Customer)
export const registerUser = async (userData: IUser) => {
  const { email, password, role } = userData;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;

  const newUser = new User({ ...userData, role });
  await newUser.save();
  return newUser;
};

// Login a user (Salesman or Customer)
export const loginUser = async (email: string, password: string) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
  // Generate a token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    'your-secret-key', // Use an environment variable for the secret key
    { expiresIn: '1h' }
  );

  return { token, user };
};
