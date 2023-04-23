const express = require("express");
const router = express.Router();
const body = require("express-validator").body;

//controllers
const UserController = require("./../controllers/userController");

//validators
const UserValidator = require("./../validators/userValidator");

//root making
router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.seeOneUSer);

router.post(
  "/",
  body("email").isEmail().withMessage("ایمیل وارد شده اشتباه است"),
  body("passwordConfirmation")
    .isLength({
      min: 5,
    })
    .withMessage("طول پسورد بایستی حداقل 5 کاراکتر باشد"),
  UserController.createUser
);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
