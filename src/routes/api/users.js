const passport = require("passport");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  const {
    body: { user },
  } = req;

  var body = req.body;
  if (!user?.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!user?.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local-login",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        const token = jwt.sign(passportUser, "secret");
        return res.json({ user, token });
        return res.json({ user: user });
      }
      return res.status(422).json({
        errors: {},
      });
    }
  )(req, res, next);
});

router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // console.log(req.user);
    res.json("Secret Data");
  }
);

module.exports = router;
