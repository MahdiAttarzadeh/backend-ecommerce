const Validator = require("./validator");
const { check } = require("express-validator");

module.exports = new (class UserValidator extends Validator {
  handle(req, res, next) {
    next();
    return [
      check("email", "فرمت ایمیل صحیح نیست").isEmail(),
      check("password", "طول پسورد بایستی حداقل 5 کاراکتر باشد").isLength({
        min: 5,
      }),
    ];
  }
})();
