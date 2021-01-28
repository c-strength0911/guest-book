const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
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

// function isCorrect(req, res, next) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       result: "fail",
//       errors: errors.array(),
//     });
//   }
//   next();
// }

connection.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log("Connected to Mysql");
  }
});

app.get("/test", (req, res) => {
  res.json("test");
});
// SELECT gb.id, gb.name ,gb.content, gbc.comment_ID, gbc.comment_name, gbc.comment_content
// FROM guestbook AS gb
// LEFT JOIN guestbook_comment AS gbc
// ON gbc.guestbook_ID = gb.id;
app.get("/join", (req, res) => {
  var checkQuery =
    "SELECT gb.id, gb.name ,gb.content, gbc.comment_ID, gbc.comment_name, gbc.comment_content FROM guestbook AS gb LEFT JOIN guestbook_comment AS gbc ON gbc.guestbook_ID = gb.id";
  var guestbook_rows, comment_rows;
  connection.query(checkQuery, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else return res.json(rows);
  });
});
// .isLength({ min: 2 })
app.post(
  "/insert",
  body("name").trim().notEmpty().isLength({ min: 2 }),
  body("content").trim().notEmpty().isLength({ min: 2 }),
  (req, res) => {
    let insertQuery = "INSERT INTO guestbook(name, content) VALUE(?,?)";
    const { name, content } = req.body; //중요
    connection.query(insertQuery, [name, content], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ result: "fail" });
      } else {
        return res.status(200).json({ result: "success" });
      }
    });
  }
);

app.delete("/delete", body("id").notEmpty().isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: "fail",
      errors: errors.array(),
    });
  }
  let deleteQuery = "DELETE FROM guestbook WHERE id = (?)";
  const { id } = req.body;
  connection.query(deleteQuery, id, (err) => {
    if (err) {
      return res.status(500).json({ result: "fail" });
    } else {
      return res.status(200).json({ result: "success" });
    }
  });
});

app.patch("/edit", body("id").notEmpty().isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: "fail",
      errors: errors.array(),
    });
  }
  let editQuery = "UPDATE guestbook SET content = (?) WHERE id = (?)";
  const { content, id } = req.body;
  connection.query(editQuery, [content, id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: "fail" });
    } else {
      return res.status(200).json({ result: "success" });
    }
  });
});

app.get("/comment/join", function (req, res) {
  const {} = req.body;

  let checkQuery = "SELECT * FROM guestbook ORDER BY id DESC";
});

app.post(
  "/comment/insert",
  body("guestbook_ID").trim().notEmpty(),
  body("comment_name").trim().notEmpty().isLength({ min: 2 }),
  body("comment_content").trim().notEmpty().isLength({ min: 2 }),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        result: "fail",
        errors: errors.array(),
      });
    }
    const { guestbook_ID, comment_name, comment_content } = req.body;
    console.log(guestbook_ID, comment_name, comment_content);
    let insertQuery =
      "INSERT INTO guestbook_comment(guestbook_ID, comment_name, comment_content) VALUE(?,?,?)";
    connection.query(
      insertQuery,
      [guestbook_ID, comment_name, comment_content],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ result: "fail" });
        } else {
          return res.status(200).json({ result: "success" });
        }
      }
    );
  }
);

app.listen(PORT, () => {
  console.log(`OPENED PORT : ${PORT}`);
});
