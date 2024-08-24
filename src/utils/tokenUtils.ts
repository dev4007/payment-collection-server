import jwt from 'jsonwebtoken';

// Function to generate a token
export const generateToken = (userId: string, role: string): string => {
  const payload = { userId, role };
  const secret = process.env.JWT_SECRET as string;
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};
