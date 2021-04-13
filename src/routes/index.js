// var express = require("express");
// var router = express.Router();
// // var sql = require("mssql");
// const auth = require("../routes/auth");
// const passport = require("passport");
// // require("../config/passport");
// var LocalStrategy = require("passport-local").Strategy;

// var dbConfig = {
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "123456",
//   port: 5432,
// };

// // passport.use(
// //   "local-signup",
// //   new LocalStrategy(
// //     {
// //       // by default, local strategy uses username and password, we will override with email
// //       usernameField: "email",
// //       passwordField: "password",
// //       passReqToCallback: true, // allows us to pass back the entire request to the callback
// //     },
// //     (req, email, password, done) => {
// //       // callback with email and password from our form
// //     }
// //   )
// // );

// const { Client } = require("pg");

// const client = new Client(dbConfig);

// client.connect();

// const query = `CREATE TABLE users (
//   email varchar,
//   password varchar);`;
// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// //GET API
// router.get("/api", function (req, res) {
//   getEmployees();
// });

// function getEmployees() {
//   // var dbConn = new sql.Connection(dbConfig);
//   client
//     .query(query)
//     .then((res) => {
//       console.log("Table is successfully created");
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       client.end();
//     });
// }
// module.exports = router;

// // POST login route (optional, everyone has access)
// router.get("/login", auth.optional, (req, res, next) => {
//   // const {
//   //   body: { user },
//   // } = req;

//   // if (!user.email) {
//   //   return res.status(422).json({
//   //     errors: {
//   //       email: "is required",
//   //     },
//   //   });
//   // }

//   // if (!user.password) {
//   //   return res.status(422).json({
//   //     errors: {
//   //       password: "is required",
//   //     },
//   //   });
//   // }
//   console.log("passport", passport.strategies.SessionStrategy);
//   // return passport.authenticate(
//   //   "local",
//   //   { session: false },
//   //   (err, passportUser, info) => {
//   //     if (err) {
//   //       return next(err);
//   //     }

//   //     if (passportUser) {
//   //       const user = passportUser;
//   //       user.token = passportUser.generateJWT();

//   //       return res.json({ user: user.toAuthJSON() });
//   //     }

//   //     return status(400).info;
//   //   }
//   // )(req, res, next);
// });

const express = require("express");
const router = express.Router();

router.use("/api", require("./api"));

module.exports = router;
