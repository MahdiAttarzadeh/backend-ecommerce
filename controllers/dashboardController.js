const User = require("./../models/user");
const Payment = require("./../models/payment");
let controller = require("./controller");
const axios = require("axios");
const { validationResult } = require("express-validator");
const Product = require("../models/product");

module.exports = new (class dashboardController extends controller {
  async index(req, res, next) {
    try {
      res.render("dashboard/index");
    } catch (err) {
      next(err);
    }
  }

  async pay(req, res, next) {
    try {
      let params = {
        MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
        Amount: req.body.amount,
        CallbackURL: "http://localhost:3000/paycallback",
        Description: "افزایش اعتبار حساب کاربری ",
      };
      const response = await axios.post(
        "https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json",
        params
      );
      console.log(response);
      if (response.data.status == 100) {
        let newPayment = new Payment({
          user: req.user.id,
          amount: req.body.amount,
          resnumber: response.data.Authority,
        });
        await newPayment.save();
        res.redirect(
          `https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`
        );
      } else res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }

  async edituser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/dashboard");
      }
      let data = {
        name: req.body.name,
      };
      console.log(req.file.path);
      if (req.file) {
        data.img = req.file.path.replace(/\\/g, "/").substring(6);
      }
      await User.updateOne({ _id: req.user.id }, { $set: data });
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await Product.find().lean();
      res.send(products);
    } catch (err) {
      next(err);
    }
  }

  async addProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/dashboard");
      }
      let data = {
        productName: req.body.name,
        productPrice: req.body.price,
      };
      console.log(req.file.path);
      if (req.file) {
        data.img = req.file.path.replace(/\\/g, "/").substring(6);
      }
      let newProduct = new Product(data);
      await newProduct.save();
      res.status(200).end();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
})();
