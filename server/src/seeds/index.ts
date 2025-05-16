import { seedUsers } from './user-seeds.js';
import sequelize from '../config/connection.js';

// TODO: Seed the database with initial data (e.g., users)
const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    // NOTE Drops and recreates tables before seeding

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    // NOTE Populates users table with test data

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
// NOTE Run with: `npm run seed` or equivalent script
