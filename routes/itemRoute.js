const express = require("express");

const passport = require("passport");
const {
  itemFetch,
  itemList,
  itemsHistory,
  itemsOpen,
} = require("../controllers/itemController");
const router = express.Router();

router.param("itemId", async (req, res, next, itemId) => {
  const item = await itemFetch(itemId);
  if (!item) next({ message: "Item not found", status: 404 });
  req.item = item;
  next();
});
router.get("/", itemList);
router.get(
  "/history",
  passport.authenticate("jwt", { session: false }),
  itemsHistory
);
router.get(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  itemsOpen
);
module.exports = router;
