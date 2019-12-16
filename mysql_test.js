var mysql = require('mysql');

//read in environment variables from .env
const dotenv = require('dotenv');
dotenv.config();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.rootPW
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});