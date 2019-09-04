const router = require('express').Router();
const boxScoreControllers = require('../../controllers/boxScoreControllerss');

// Matches with "/api/v1/boxscores"

router.route('/boxscores').post(boxScoreControllers.login);

module.exports = router;
