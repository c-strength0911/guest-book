const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "c_strength",
  password: "!Rkddls7536",
  database: "test_db",
});

const guestbookList = document.getElementById("guestbook__list");
const gusetbookForm = document.getElementById("guestbook__form");

connection.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log("Connected to Mysql");
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

gusetbookForm.addEventListener("submit", (event) => {});
