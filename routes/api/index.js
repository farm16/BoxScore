const router = require('express').Router();
const userRoutes = require('./boxScore');

router.use('/boxScore', userRoutes);

module.exports = router;
