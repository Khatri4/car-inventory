const express = require("express");
const router = express.Router();
const Car = require("../models/cars");
const multer = require("multer");
const path = require("path");
const config = require("../config.json");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


router.post("/", upload.array("Images", 5), async (req, res) => {
  try {
    const imagePaths = req.files.map(
      (file) => `http://localhost:${config.PORT}/uploads/${file.filename}`
    );
    const newCar = new Car({ ...req.body, Images: imagePaths });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedFields = { ...req.body };

    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(
        (file) => `http://localhost:${config.PORT}/uploads/${file.filename}`
      );
      updatedFields.Images = imagePaths;
    }

    const updatedCar = await Car.findByIdAndUpdate(carId, updatedFields, {
      new: true,
    });

    if (!updatedCar) return res.status(404).json({ message: "Car not found" });

    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
