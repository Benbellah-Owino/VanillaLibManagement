const express = require("express")
const router = express.Router();
const { createUser, loginUser, userDetails, updateUser, sendFogorEmail } = require("../controllers/users")

router.post("/registerUser", createUser);
router.post("/loginUser", loginUser);
router.get("/userDetails", userDetails);
router.post("/updateuser", updateUser);
router.post("/sendEmail", sendFogorEmail);

module.exports = router