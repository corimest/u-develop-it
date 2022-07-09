const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'BelletheFrenchie2021!',
  database: 'parties'
});

module.exports = db; 