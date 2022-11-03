const router = require("express").Router();
const {
  authRegister,
  authLogin,
} = require("../../controllers/auth/authController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  loginValidate,
} = require("../../helpers/Protected");
const { check } = require("express-validator");

router.post("/register", verifyToken, verifyTokenAndAdmin, authRegister);
router.post(
  "/login",
  [
    check("email", "check email").isEmail(),
      check("password", "check password").isLength({ min: 8 }),
    
  ],
  authLogin
);

module.exports = router;
