const router = require("express").Router();
const passport = require("passport");

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ...(isProduction && { ssl: { rejectUnauthorized: false } }),
});

router.get("/add", async (req, res, next) => {
  const {
    body: { queue },
  } = req;
  console.log("🚀 ~ file: queue.js ~ line 16 ~ router.get ~ queue", queue);
  await pool.query("INSERT INTO queue (full_name,status) values ($1,$2);", [
    queue.fullName,
    "0",
  ]);
  pool.query(
    "CREATE TABLE queue (id SERIAL,full_name varchar,status integer ,timestamp timestamp default current_timestamp);"
  );

  pool.query("SELECT * FROM queue WHERE  status = 0;", (errQ, resQ) => {
    res.json(resQ.rows);
  });
});

router.get("/nextQueue", async (req, res, next) => {
  const {
    body: { queue },
  } = req;
  await pool.query(
    `UPDATE queue SET  status = 2 WHERE  ID =${queue.currentQueue};
    UPDATE queue SET  status = 1 WHERE  ID =${queue.currentQueue + 1};`
  );

  pool.query(`SELECT * FROM queue WHERE  status = 1;`, (errQ, resQ) => {
    res.json(resQ.rows[0].id);
  });
});

module.exports = router;
