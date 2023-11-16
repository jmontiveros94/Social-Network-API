const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
// importing the user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// creating routes for the users and thoughts
module.exports = router;