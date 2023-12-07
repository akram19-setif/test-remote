const router = require("express").Router();
// Models
const Sectors = require("../models/sector");

// get sectors
router.get("/", async (req, res) => {
  try {
    const sectors = await Sectors.find();
    res.json(sectors);
  } catch (error) {
    console.error("Error fetching sectors from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
