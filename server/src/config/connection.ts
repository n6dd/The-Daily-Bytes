import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
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

export default sequelize;
import dotenv from 'dotenv';
dotenv.config();
// TODO: Load environment variables from .env
// NOTE Ensures DB credentials and URLs are not hardcoded

import { Sequelize } from 'sequelize';

// TODO: Initialize Sequelize instance based on environment
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  // NOTE Use DB_URL if provided (e.g., on Render)
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

// NOTE Export Sequelize connection for model use
export default sequelize;
