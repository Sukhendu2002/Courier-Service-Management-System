const express = require("express");
const router = express.Router();

const {
  addBranchHead,
  loginBranchHead,
} = require("../controllers/branchHeadCtrl");

router.post("/add", addBranchHead);
router.post("/login", loginBranchHead);

module.exports = router;
