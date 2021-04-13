var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");

const { Pool, Client } = require("pg");
// pools will use environment variables
// for connection information
const pool = new Pool();

router.get("/", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "../views/register.html"));
});

router.post("/", function (req, res, next) {
  //   pg.connect(connectionString, function (err, client) {

  pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [req.body.username, req.body.password],
    (err, res) => {
      console.log(err, res);
      pool.end();
    }
  );

  // query.on("error", function (err) {
  //   console.log(err);
  // });
});

module.exports = router;
