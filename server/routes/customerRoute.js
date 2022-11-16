const express = require("express");
const router = express.Router();

const { create, login,getAllCustomers } = require("../controllers/customerCtrl");

router.post("/create", create);
router.post("/login", login);
router.get("/", getAllCustomers);

module.exports = router;
