const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const PORT = 8000;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "test_db",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.use(cors());
app.use(morgan("dev"));
connection.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log("Connected to Mysql");
  }
});

// function isCorrect(req, res, next) {
//   const { name, content } = req.body;
//   if (!name.trim() || !content.trim()) {
//     return () => {
//       res.status(400).end();
//       next();
//     };
//   } else next();
// }

app.get("/test", (req, res) => {
  res.json("test");
});
app.get("/join", (req, res) => {
  var sql = "SELECT * FROM guestbook ORDER BY id DESC";
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else return res.json(rows);
  });
});

app.post("/insert", (req, res) => {
  let insertQuery = "INSERT INTO guestbook(name, content) VALUE(?,?)";
  const { name, content } = req.body;
  connection.query(insertQuery, [name, content], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: "fail" });
    } else {
      return res.status(200).json({ result: "success" });
    }
  });
});

app.post("/delete", (req, res) => {
  let deleteQuery = "DELETE FROM guestbook WHERE id = (?)";
  const { id } = req.body;
  connection.query(deleteQuery, id, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: "fail" });
    } else {
      return res.status(200).json({ result: "success" });
    }
  });
});
app.post("/edit", (req, res) => {
  const { content, id } = req.body;
  let editQuery = "UPDATE guestbook SET content = (?) WHERE id = (?)";
  connection.query(editQuery, [content, id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: "fail" });
    } else {
      return res.status(200).json({ result: "success" });
    }
  });
});

app.get("comment/join", function (req, res) {});
app.post("comment/insert", function (req, res) {});
// app.post("/create", (req, res) => {});
app.listen(PORT, () => {
  console.log(`OPENED PORT : ${PORT}`);
});
