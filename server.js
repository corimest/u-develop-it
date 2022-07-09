// import mySQL
const mysql = require('mysql2'); 
//import Express.js
const express = require('express'); 
// PORT server connections
const PORT = process.env.PORT || 3001; 
const app = express(); 
// import inputCheck module
const inputCheck = require('./utils/inputCheck');

// express middleware
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

// connect app to mySQL database
const db = mysql.createConnection(
    {
        host: 'localhost', 
        //MySQL username
        user: 'root', 
        // MySQL password
        password: 'BelletheFrenchie2021!', 
        database: 'parties'
    },
    console.log('Connected to the parties database.')
);

// get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message }); 
            return; 
        }
        res.json({
            message: 'success', 
            data: rows
        });
    });
});


// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id 
             WHERE candidates.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = 'DELETE FROM candidates WHERE id = ?'; 
    const params = [req.params.id]; 

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message }); 
        } else if (!result.affectedRows) {
            // if there have been no affectedRows, then there are no candidates that match and nothing was deleted
            res.json({
                message: 'Candidate not found'
            });
        }else {
            res.json({
                message: 'Successfully Deleted', 
                // Verify whether any rows were changed
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
}); 

// Create a candidate
// const sql = 'INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)'; 
// const params = [1, 'Ronald', 'Firbank', 1]; 

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err); 
//     }
//     console.log(result); 
// }); 
app.post('/api/candidate', ({ body }, res) => {
    // validate the data
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected'); 
    if (errors) {
        res.status(400).json({ error: errors }); 
        return; 
    }
    // MySQL qill autogenerate an ID
    const sql = 'INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?, ?, ?)'; 
    const params = [body.first_name, body.last_name, body.industry_connected]; 

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message }); 
            return; 
        }
        res.json({
            message: 'success', 
            data: body
        });
    });
});

// Default response for requests that aren't supported by the app
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log('Server running on port ${PORT}'); 
}); 