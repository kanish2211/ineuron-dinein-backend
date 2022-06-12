const router = require("express").Router();
const auth = require("../../middleware/auth");
const Cuisine = require("../../model/cuisines");
const Admin = require("../../model/admin");
const shortId = require("shortid");

router.post("/", auth, async (req, res, next) => {
  const { cuisineName } = req.body;
  try {
    const { id } = req.tokenData;
    const isAdmin = await Admin.findOne({ id }, { id });
    if (!isAdmin)
      return res
        .status(401)
        .json({ error: "You are not authorized to add cuisines" });
    const isCuisineAvailable = await Cuisine.findOne({ cuisineName });
    if (isCuisineAvailable)
      return res
        .status(400)
        .json({ error: `Cuisine with this name ${cuisineName} exists` });
    await Cuisine.create(
      new Cuisine({ cuisineId: shortId.generate(), cuisineName })
    );
    return res
      .status(200)
      .json({ message: `${cuisineName} cuisine has been added successfully` });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res, next) => {
  const { cuisineId } = req.query;
  try {
    if (cuisineId) {
      const cuisine = await Cuisine.findOne({ cuisineId });
      return res.status(200).json(cuisine);
    }
    const totalCuisines = await Cuisine.find({});
    return res.status(200).json(totalCuisines);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
