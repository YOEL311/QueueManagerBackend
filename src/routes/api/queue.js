const router = require("express").Router();
const passport = require("passport");

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ...(isProduction && { ssl: { rejectUnauthorized: false } }),
});

router.post("/add", async (req, res, next) => {
  const {
    body: { queue },
  } = req;

  await pool.query("INSERT INTO queue (full_name,status) VALUES ($1,$2);", [
    queue.fullName,
    "0",
  ]);

  pool.query("SELECT * FROM queue;", (errQ, resQ) => {
    res.json(resQ.rows);
  });
});

router.post("/nextQueue", async (req, res, next) => {
  const resInService = await pool.query(
    `SELECT * FROM queue WHERE  status = 1;`
  );
  console.log(
    "🚀 ~ file: queue.js ~ line 31 ~ router.post ~ resInService",
    resInService
  );
  const currentQueue = resInService.rows[0].id;
  console.log(
    "🚀 ~ file: queue.js ~ line 32 ~ router.post ~ currentQueue",
    currentQueue
  );
  await pool.query(
    `UPDATE queue SET  status = 2 WHERE  ID =${resInService};
    UPDATE queue SET  status = 1 WHERE  ID =${resInService};`
  );

  pool.query(`SELECT * FROM queue`, (errQ, resQ) => {
    resQ && res.json(resQ.rows);
  });
});

router.get("/getList", async (req, res, next) => {
  pool.query(`SELECT * FROM queue`, (errQ, resQ) => {
    resQ && res.json(resQ.rows);
  });
});

module.exports = router;
