import sequelize from '../config/connection.js';
// TODO: Import Sequelize instance
// NOTE This connects to your PostgreSQL DB using .env config

import { UserFactory } from './user.js';
// TODO: Import user model factory function

// ==============================
// TODO: Initialize User model with Sequelize connection
// ==============================
const User = UserFactory(sequelize);

// ==============================
// TODO: Export initialized models
// ==============================
// NOTE Export initialized models for use in routes and controllers
export { User };
