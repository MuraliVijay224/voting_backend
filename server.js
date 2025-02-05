const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/votes', voteRoutes);

app.use(async(err, _req, res, _next) =>{
    console.log(err);
    res.status(500).json({message:"Internal server error"})
})

app.listen(5000, ()=>{
    console.log("Server is listening at port 5000")
})