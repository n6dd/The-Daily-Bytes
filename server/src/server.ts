const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { mainNewsRouter } from './routes/api/mainNews.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json());
app.use('/api/news', mainNewsRouter); 
app.use(routes); 
app.use(express.static('../client/dist'));


app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
});