const express = require("express");
const router = express.Router();

const { create, login } = require("../controllers/customerCtrl");

router.post("/create", create);
router.post("/login", login);

module.exports = router;
