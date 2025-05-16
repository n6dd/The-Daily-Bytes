// ==============================
// TODO: Load environment variables from .env
// ==============================
import dotenv from 'dotenv';
dotenv.config(); 
// NOTE Ensures DB credentials and URLs are not hardcoded

// ==============================
// TODO: Import Sequelize ORM
// ==============================
import { Sequelize } from 'sequelize';

// ==============================
// TODO: Initialize Sequelize instance
// ==============================
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL) 
  // NOTE Use DB_URL if provided (e.g., on Render for production)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// ==============================
// TODO: Export connection
// ==============================
export default sequelize;
// NOTE Exported as default so it can be imported in models and server.ts
