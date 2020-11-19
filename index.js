const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "test_db",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/static", express.static("public"));
app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log("Connected to Mysql");
  }
});

app.get("/join", function (req, res) {
  var sql = "SELECT * FROM guestbook ORDER BY id DESC";
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else return res.json(rows);
  });
});

app.post("/insert", function (req, res) {
  var insertQuery = "INSERT INTO guestbook(name, content) VALUE(?,?)";
  const { name, content } = req.body;
  connection.query(insertQuery, [name, content], (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ result: "success" });
    } else {
      return res.status(200).json({ result: "success" });
    }
  });
});

//app.post("/create", (req, res) => {});
app.listen(8000, () => {
  console.log("OPEN");
});
