const pool = require('../config/db');

// Create a new vote
const createVote = async (req, res) => {
  const { vote_value, party_name } = req.body;

  const query = await pool.query(`SELECT * FROM votes WHERE user_id = ${req.user.id}`) 
  if(query.rows.length > 0){
    res.status(409).json({message: "User Already voted"});
    return;
  }

  try {
    const vote = await pool.query(
      'INSERT INTO votes (user_id, vote_value, party_name) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, vote_value, party_name]
    );
    console.log("req", req.user)
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

const getAllVotesByGroup = async(req, res) =>{
  const query = `SELECT count(*), party_name FROM votes GROUP BY party_name`
  try {
    const votes = await pool.query(query);
    res.status(200).json(votes.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grouped votes', error });
  }
}

module.exports = { createVote, getAllVotes, getAllVotesByGroup };
