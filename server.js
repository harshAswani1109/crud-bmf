const express = require("express");
const app = express();

//router

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});
