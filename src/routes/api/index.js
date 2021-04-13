const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use("/users", require("./users"));

const queueRouter = require("./queue");

router.use(
  "/queue",
  passport.authenticate("jwt", { session: false }),
  queueRouter
);

module.exports = router;
