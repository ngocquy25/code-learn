const express = require('express')
const app = express()
const port = 3001

//set up

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',         //can modify 
  host: 'localhost',
  database: 'code-learn-db',
  password: 'postgres',     //can modify
  port: 5432,
});

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// getAllQuestionID
// app.get("/", async (req, res) => {
//     try {
//         const question_id = await pool.query('SELECT question_id FROM problem');
//         res.status(200).json({count: question_id.rowCount, list: question_id.rows});
//     } catch(error) {
//         res.status(500).send(error);
//     }
// })

// getQuestionList
app.get("/", async (req, res) => {
    try {
        const question = await pool.query('SELECT * FROM problem');
        res.status(200).json(question.rows);
    } catch(error) {
        res.status(500).send(error);
    }
})

// getQuestion
app.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const question_id = await pool.query('SELECT * FROM problem WHERE question_id = $1', [id]);
        res.status(200).json(question_id.rows);
    } catch(error) {
        res.status(500).send(error);
    }
})
  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})