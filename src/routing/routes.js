const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

module.exports = (app) => {
  const router = express.Router();

  // Routes not requiring authentication
  router.use('/auth', authRoutes);

  // Routes requiring authentication
  router.use('/api/users', userRoutes);

  app.use(router);
};
