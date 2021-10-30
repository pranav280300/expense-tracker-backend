var express = require("express");
const router = express.Router();
const { register, login, getme } = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getme);
module.exports = router;
