const express = require("express");
const mongoose = require("mongoose");
const app = express();

//router

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});

mongoose
  .connect(
    "mongodb+srv://personalwork1109:Mongodb123@blogcrud.pzd7qlo.mongodb.net/crud-bmf?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to DB");
    app.listen;
  })
  .catch((error) => {
    console.log(error);
  });
