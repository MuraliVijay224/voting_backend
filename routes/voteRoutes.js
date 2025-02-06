const express = require('express');
const { createVote, getAllVotes,getAllVotesByGroup } = require('../controllers/voteController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/vote', authenticate, authorize(2), createVote);
router.get('/votes', authenticate, authorize(1), getAllVotes);
router.get('/votes-by-group', authenticate, authorize(1), getAllVotesByGroup);

module.exports = router;
