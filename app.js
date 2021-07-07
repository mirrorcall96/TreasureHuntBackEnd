const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const usersRoute = require("./routes/usersRoute.js");
const itemRoute = require("./routes/itemRoute.js");

const app = express();
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(cors());
app.use(express.json());
db.sequelize.sync({ alter: true });
app.use("/", usersRoute);
app.use("/items", itemRoute);
app.use((req, res, next) =>
  res.status(404).json({ message: "Path Not Found" })
);
app.use((err, req, res, next) =>
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" })
);

app.listen(8000);
