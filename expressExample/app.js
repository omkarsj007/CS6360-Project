// module.exports = app;
const dbConfig = require("./config/db.config.js");
const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const mysql = require('mysql2');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: dbConfig.PASSWORD,
 database: dbConfig.DB,
});

conn.connect();


app.use(cors(corsOptions));
 
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.get("/getAllTodos", (req, res, next) => {
  conn.query("SELECT * FROM customer", function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 });

 app.post("/getQuery", (req, res, next) => {
  const { query } = req.body;
  const parsedQuery = query.split('\n').join(' ');
  conn.query(parsedQuery, function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 });

// db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});