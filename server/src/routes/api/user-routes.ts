// server/src/routes/api/user-routes.ts
import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

// ==============================
// TODO: GET /users → Fetch all users
// ==============================
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // NOTE: Exclude sensitive data
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// TODO: GET /users/:id → Fetch user by ID
// ==============================
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// TODO: POST /users → Create new user
// ==============================
router.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// ==============================
// TODO: PUT /users/:id → Update user by ID
// ==============================
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password; // NOTE: Will be hashed by model hook
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// ==============================
// TODO: DELETE /users/:id → Delete user by ID
// ==============================
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;  
// NOTE Mounted at /api/users via api/index.ts
