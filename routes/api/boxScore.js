const router = require('express').Router();
const boxScoreControllers = require('../../controllers/boxScoreControllers');
const cache = require('../../middleware/');
// Matches with ex: "/api/v1/boxscore/:"

router.route('/mlb').get(cache, boxScoreControllers.getMlb);
router.route('/nba').get(cache, boxScoreControllers.getNba);

module.exports = router;
