const { Item } = require("../db/models");
exports.itemList = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        userId: null,
      },
      attributes: { exclude: ["userId", "isTreasure"] },
    });
    res.json(items);
  } catch (e) {
    next(e);
  }
};
exports.itemFetch = async (itemId) => {
  const myItem = await Item.findByPk(itemId);
  return myItem;
};
exports.itemsHistory = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(items);
  } catch (e) {
    next(e);
  }
};
exports.itemsOpen = async (req, res, next) => {
  try {
    if (req.user.balance < 5) throw { status: 401, message: "No Balance" };
    if (req.item.userId !== null)
      throw { status: 401, message: "Item Already Opened" };
    await req.item.update({ userId: req.user.id });
    await req.user.update({ balance: req.user.balance - 5 });
    res.json(req.item);
  } catch (e) {
    next(e);
  }
};
