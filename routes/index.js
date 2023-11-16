const router = require('express').Router();
const apiRoutes = require('./api');
// importing the routes from the api folder above
// tells the router to use the routes from the api folder
router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;