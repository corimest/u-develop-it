// import mySQL
const mysql = require('mysql2'); 
//import Express.js
const express = require('express'); 
// PORT server connections
const PORT = process.env.PORT || 3001; 
const app = express(); 

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
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// SQL database query
db.query('SELECT * FROM candidates', (err, rows) => {
    console.log(rows); 
}); 


// Default response for requests that aren't supported by the app
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log('Server running on port ${PORT}'); 
}); 