const Validator = require("./validator");
const { check } = require("express-validator");
const path = require("path");

module.exports = new (class ProductValidator extends Validator {
  handle() {
    return [
      check("name", "نام نمیتواند خالی باشد").not().isEmpty(),
      check("price", "نام نمیتواند خالی باشد").not().isEmpty(),
      check("img", "وجود تصویر الزامیست").not().isEmpty(),
      check("img").custom(async (value) => {
        if (!value) {
          return;
        }
        if (![".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(value))) {
          throw new Error("پسوند قایل صحیح نیست");
        }
      }),
    ];
  }
})();
