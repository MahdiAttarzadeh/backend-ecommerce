const express = require("express");
const router = express.Router();

//controllers
const dashboardController = require("controllers/dashboardController");
const editUserValidator = require("validators/editUserValidator");
const ProductValidator = require("validators/ProductValidator");
const uploadUserProfile = require("upload/uploadUserProfile");

//root making
router.get("/products", dashboardController.getProducts);
router.get("/", dashboardController.index);

router.post("/pay", dashboardController.pay);
router.post(
  "/edituser",
  uploadUserProfile.single("img"),
  (req, res, next) => {
    if (!req.file) {
      req.body.img = null;
    } else {
      req.body.img = req.file.filename;
    }
    next();
  },
  editUserValidator.handle(),
  dashboardController.edituser
);

router.post(
  "/addProduct",
  uploadUserProfile.single("img"),
  (req, res, next) => {
    if (!req.file) {
      req.body.img = null;
    } else {
      req.body.img = req.file.filename;
    }
    next();
  },
  ProductValidator.handle(),
  dashboardController.addProduct
);

module.exports = router;
