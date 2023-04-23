const User = require("./../models/user");
let controller = require("./controller");
const { validationResult } = require("express-validator");

module.exports = new class dashboardController extends controller {
  async index(req, res, next) {
    try {
     res.render('dashboard/index')
    } catch (err) {
      next(err);
    }
  }
}