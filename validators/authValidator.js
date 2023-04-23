const Validator = require("./validator");
const { check } = require("express-validator");
const { login } = require("../controllers/authController");

module.exports = new class UserValidator extends Validator {
  register() {
    return [
      check("name", "نام نمیتواند خالی باشد").not().isEmpty(),
      check("email", "فرمت ایمیل صحیح نیست").isEmail(),
      check("password", "طول پسورد بایستی حداقل 5 کاراکتر باشد").isLength({
        min: 5,
      }),
    ]
  }
  login() {
    return [
      check("email", "فرمت ایمیل صحیح نیست").isEmail(),
      check("password", "طول پسورد بایستی حداقل 5 کاراکتر باشد").isLength({
        min: 5,
      })
    ]
  }
}
