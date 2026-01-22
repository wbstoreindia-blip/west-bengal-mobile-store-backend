const express = require("express");
const router = express.Router();
const cloudinary = require("../services/cloudinary");

router.post("/", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image required" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "products"
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
