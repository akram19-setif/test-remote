const router = require("express").Router();
const usersDataModel = require("../models/userData");

// CREATE
router.post("/create", async (req, res) => {
  const newUserData = new usersDataModel(req.body);
  try {
    const savedUserData = await newUserData.save();
    res.status(201).json(savedUserData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update user data
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedUserData = await usersDataModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Get all Data
router.get("/", async (req, res) => {
  try {
    const usersData = await usersDataModel.find();
    res.status(200).json(usersData);
  } catch (error) {
    console.error("Error fetching usersData from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
