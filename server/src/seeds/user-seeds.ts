import { User } from '../models/index.js';

// ==============================
// TODO: Seed the users table with sample data
// ==============================
export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password' },
      { username: 'SunnyScribe', email: 'sunny@scribe.com', password: 'password' },
      { username: 'RadiantComet', email: 'radiant@comet.com', password: 'password' },
      { username: '123', email: '123@gmail.com', password: '123' }, // NOTE: Test login
    ],
    {
      individualHooks: true, // NOTE Triggers password hashing hooks
    }
  );
};
