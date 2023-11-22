const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product/productController.js");
const auth = require("../../middleware/auth.js");

//view all
router.get("/view", productController.viewProduct);

// login user
router.post("/add", auth, productController.addProduct);

//signup user
router.put("/update/:id", auth, productController.updateProduct);

//signupGoogle user
router.delete("/delete/:id", productController.deleteProduct);


module.exports = router;
