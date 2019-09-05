const router = require('express').Router();
const userRoutes = require('./boxScore');

router.use('/boxscore', userRoutes);

module.exports = router;
