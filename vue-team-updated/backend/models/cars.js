const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  Brand: { type: String, required: true },
  Model: { type: String, required: true },
  Year: { type: Number, required: true },
  CarType: { type: String, required: true },
  FuelType: { type: String, required: true },
  Transmission: { type: String, required: true },
  EngineCapacity: { type: Number },
  Displacement: { type: Number },
  Cylinders: { type: Number },
  MaxPower: { type: String },
  SeatingCapacity: { type: Number },
  Airbags: { type: Number },
  Price: { type: Number, required: true },
  Images: [String],
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
