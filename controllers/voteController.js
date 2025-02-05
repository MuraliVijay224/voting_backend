const pool = require('../config/db');

// Create a new vote
const createVote = async (req, res) => {
  const { vote_value } = req.body;

  try {
    const vote = await pool.query(
      'INSERT INTO votes (user_id, vote_value) VALUES ($1, $2) RETURNING *',
      [req.user.id, vote_value]
    );
    res.status(201).json(vote.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vote', error });
  }
};

// Get all votes (for admin)
const getAllVotes = async (req, res) => {
  try {
    const votes = await pool.query('SELECT * FROM votes');
    res.status(200).json(votes.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching votes', error });
  }
};

module.exports = { createVote, getAllVotes };
