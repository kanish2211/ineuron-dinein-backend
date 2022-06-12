const router = require("express").Router();
const auth = require("../../middleware/auth");
const Menu = require("../../model/menu");
const Admin = require("../../model/admin");
const uniqId = require("uniqid");

router.post("/", auth, async (req, res, next) => {
  const { name, price, discountPrice } = req.body;
  try {
    const { id } = req.tokenData;
    const isAdmin = await Admin.findOne({ id }, { id });
    if (!isAdmin)
      return res
        .status(401)
        .json({ error: "You are not authorized to add Menu" });
    const isMenuAvailable = await Menu.findOne({ name }, { name });
    if (isMenuAvailable)
      return res.status(400).json({ error: `Menu with name ${name} exists` });
    if (discountPrice && discountPrice > price)
      return res
        .status(400)
        .json({ error: "discountPrice cannot be greater than price" });
    req.body.menuId = uniqId(new Date().valueOf());
    await Menu.create(new Menu(req.body));
    return res
      .status(200)
      .json({ message: `${name} has been added successfully in menu` });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/", auth, async (req, res, next) => {
  const { menuId } = req.query;
  const { menuId: id, price, discountPrice } = req.body;
  try {
    const { id } = req.tokenData;
    const isAdmin = await Admin.findOne({ id }, { id });
    if (!isAdmin)
      return res
        .status(401)
        .json({ error: "You are not authorized to add Menu" });
    const isMenuAvailable = await Menu.findOne({ menuId });
    if (!isMenuAvailable)
      return res.status(400).json({ error: `Menu does not exists` });
    if (discountPrice && discountPrice > price)
      return res
        .status(400)
        .json({ error: "discountPrice cannot be greater than price" });
    if(id) delete req.body.menuId;    
    await Menu.updateOne({ menuId }, req.body);
    return res.status(200).json({ message: "Menu updation is successful" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res, next) => {
  const { menuId } = req.query;
  try {
    if (menuId) {
      const menu = await Menu.findOne({ menuId });
      return res.status(200).json(menu);
    }
    const totalMenu = await Menu.find({});
    return res.status(200).json(totalMenu);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
