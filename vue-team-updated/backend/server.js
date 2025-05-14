const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const config = require("./config.json");
const carRoutes = require("./routes/carRoutes");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/cars", carRoutes);


const url = `mongodb+srv://${config.username}:${config.userpassword}@${config.clustername}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;

mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connected");
    app.listen(config.PORT, () => {
      console.log(`Server running at http://localhost:${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });
