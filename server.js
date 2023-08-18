require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const Product = require("./models/productModel");
const productRoute = require("./routes/productRoute");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false }));

//routes

app.use("/api", productRoute);

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

// app.listen(3000, () => {
//   console.log("API running on port 3000");
// });

mongoose.set("strictQuery", false); //rather than schema nothing can be sent

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
