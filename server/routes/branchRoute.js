const express = require("express");
const router = express.Router();

const {
  getBranches,
  addBranch,
  getOneBranch,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchCtrl");

router.get("/", getBranches);
router.post("/add", addBranch);
router.get("/:id", getOneBranch);
router.put("/update/:id", updateBranch);
router.delete("/delete/:id", deleteBranch);


module.exports = router;
