var localStrategy = require("passport-local").Strategy;
const pg = require("pg");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const { Pool, Client } = require("pg");
const pool = new Pool();

// passport.use('local-signup', new LocalStrategy({
// const query2 = "CREATE TABLE users (email varchar,  password varchar);";
// const query2 = "DROP TABLE users;";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query("SELECT * FROM users WHERE id=$1", [id], (err, res) => {
    done(err, res.rows[0]);
  });
});

var JWTStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "secret";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

// passport.js
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    (token, done) => {
      console.log("🚀 ~ file: passport.js ~ line 57 ~ token", token);
      return done(null, token);
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
      pool.query("SELECT * FROM users WHERE email=$1", [email], (err, res) => {
        if (err) return done(err);
        const rows = res?.rows;
        if (!rows.length) {
          return done(null, false, req.flash("loginMessage", "No user found.")); // req.flash is the way to set flashdata using connect-flash
        }
        // if the user is found but the password is wrong
        if (!(rows[0].password == password))
          return done(
            null,
            false,
            req.flash("loginMessage", "Oops! Wrong password.")
          ); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, rows[0]);
      });
    }
  )
);
