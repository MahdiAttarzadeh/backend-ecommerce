const User = require("./../models/user");
let controller = require("./controller");
const { validationResult } = require("express-validator");

class UserController extends controller {
  async getAllUsers(req, res, next) {
    try {
      let users = await User.find({});
      res.render("users", {
        users: users,
        title: "همه کاربران",
        errors: req.flash("errors"),
        message: req.flash("message"),
      });
    } catch (err) {
      next(err);
    }
  }

  async seeOneUSer(req, res, next) {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        this.error("چنین کاربری یافت نشد", 404);
      }
      res.render("user", { user: user });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res
          .status(400)
          .send(
            `validation failed. Reason:/${errors.array().map((err) => err.msg)}`
          );
      }
      console.log("submitting new user");
      req.body.id = parseInt(req.body.id);
      let newUser = new User({
        fname: req.body.fname,
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      req.flash("message", "کاربر مورد نظر ایجاد شد");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      await User.updateOne({ _id: req.params.id }, { $set: req.body });
      req.flash("message", "کاربر مورد نظر به روزرسانی شد");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await User.deleteOne({ _id: req.params.id });
      req.flash("message", "کاربر مورد نظر حذف شد");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
