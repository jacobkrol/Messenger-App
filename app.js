
//
// INITIALIZE SERVER OBJECTS AND MODULES
//

//define express module
const express = require('express');
const app = express();

//set and print hosting port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));

//read in environment variables from .env
const dotenv = require('dotenv');
dotenv.config();

//establish db connection object
const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.rootPW,
  database: "home"
});

//define hashing module
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

//allow json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
// HANDLE HTTP REQUESTS AND ROUTES
//

//define root response
app.get('/', (req, res) => {
    res.send('Hello world!');
});

//read db
app.get('/db', (req, res) => {
    db.query('SELECT * FROM test_table;', (error, result) => {
        if(error) throw error;
        res.send('Result:'+result);
    });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM User;', (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});

app.post('/messages/new', (req, res) => {
    db.query('INSERT INTO test_table (Message) VALUES (?)', [req.body.comment], (error, result) => {
        if(error) throw error;
    });
});

// hash.update('some data to hash');
// console.log(hash.digest('hex'));

app.post('/users/new', (req, res) => {
    console.log('\n==========\nNew request received');
    const hash = crypto.createHash('sha256');
    hash.update(req.body.password);
    const userPassword = hash.digest('hex');
    db.query('INSERT INTO User (userName, userPassword) VALUES (?,?)', [req.body.username, userPassword], (error, result) => {
        if(error) throw error;
        console.log('Inserted successfully');
    });
});

