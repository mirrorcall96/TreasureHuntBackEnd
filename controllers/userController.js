let { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
};
exports.signin = async (req, res) => {
  const { user } = req;
  const token = generateToken(user);
  res.json({ token });
};
exports.balanceAdd = async (req, res, next) => {
  try {
    if (req.body.balance < 0)
      throw { message: "Balance is incorrect", status: 401 };
    req.user.update({ balance: req.user.balance + +req.body.balance });
    res.json({ balance: req.user.balance });
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 15 * 60 * 1000,
  };
  const token = jwt.sign(payload, "mysecret");
  return token;
};
