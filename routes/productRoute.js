const express = require("express");
const Product = require("../models/productModel");
const {
  getProducts,
  getProduct,
  updatedProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post("/product", createProduct);

//update a product
router.put("/products/:id", updatedProduct);

//delete a product
router.delete("/products/:id", deleteProduct);

module.exports = router;
