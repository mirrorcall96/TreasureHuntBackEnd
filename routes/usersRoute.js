const express = require("express");
const { signup, signin, balanceAdd } = require("../controllers/userController");
const passport = require("passport");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post(
  "/balance",
  passport.authenticate("jwt", { session: false }),
  balanceAdd
);
module.exports = router;
