const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
// const mysql = require("mysql");
const cors = require("cors");
// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "1234",
//   database: "test_db",
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.use(cors());
app.use(morgan("dev"));
// connection.connect((err) => {
//   if (err) {
//     console.error(err.stack);
//   } else {
//     console.log("Connected to Mysql");
//   }
// });

function isCorrect(req, res, next) {
  const { name, content } = req.body;
  if (!name.trim() || !content.trim()) {
    return () => {
      res.status(400).json({
        isSuccess: false,
        message: "작성자 이름과 내용을 입력해 주세요",
      });
    };
  }
}

app.get("/test", function (req, res) {
  res.json("test");
});
app.get("/join", function (req, res) {
  // var sql = "SELECT * FROM guestbook ORDER BY id DESC";
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else return res.json(rows);
  });
});

app.post("/insert", isCorrect, function (req, res) {
  // let insertQuery = "INSERT INTO guestbook(name, content) VALUE(?,?)";
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
app.post("/edit", isCorrect, (req, res) => {
  // let insertQuery = "INSERT INTO guestbook(name, content) VALUE(?,?)";
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

app.get("comment/join", function (req, res) {});
app.post("comment/insert", function (req, res) {});
//app.post("/create", (req, res) => {});
app.listen(8000, () => {
  console.log("OPEN");
});
