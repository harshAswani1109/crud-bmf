require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const Product = require("./models/productModel");
const productRoute = require("./routes/productRoute");
// const userRoute = require("./routes/userRoute");

const {initializeApp} = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyD8atqyrV-ngf8XjCDXQQND6vEKxpVNhFk",
  authDomain: "bmf-crud.firebaseapp.com",
  projectId: "bmf-crud",
  storageBucket: "bmf-crud.appspot.com",
  messagingSenderId: "1034308123877",
  appId: "1:1034308123877:web:b744eab1df621b0040e80c"
};



const apps = initializeApp(firebaseConfig);

const errorMiddleware = require("./middleware/errorMiddleware");
var cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false }));
//routes

app.use("/api", productRoute);
// app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello Node API");
  // throw new Error("fake error");
});

app.use(errorMiddleware);

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
