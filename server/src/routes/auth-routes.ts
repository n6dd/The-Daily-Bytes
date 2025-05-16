import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router(); // TODO: Create auth router

// ==============================
// TODO: POST /auth/login → Authenticate user
// ==============================
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // NOTE Attempt to find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // TODO: Compare submitted password to hashed one
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    // NOTE Sign token with username and 12h expiry
    const token = jwt.sign({ username }, secretKey, { expiresIn: '12h' });

    return res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ==============================
// TODO: POST /auth/register → Register user and return token
// ==============================
export const signUp = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);

    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '12h' });

    return res.json({ token });
  } catch (error: any) {
    console.error('Error during registration:', error);
    return res.status(400).json({ message: error.message || 'Registration failed' });
  }
};

// ==============================
// Route Definitions
// ==============================
router.post('/login', login);       // NOTE Handles user login
router.post('/register', signUp);   // NOTE Handles user signup

export default router;
// NOTE Mounted at /api/auth in server.ts or api index
