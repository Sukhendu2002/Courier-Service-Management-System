const express = require("express");
const router = express.Router();

const {
  addStaff,
  deleteById,
  getAll,
  getOne,
  update,
  login,
  getBranchStaff,
} = require("../controllers/staffCtrl");

router.post("/add", addStaff);
router.delete("/delete/:id", deleteById);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);
router.post("/login", login);
router.get("/getbranchstaff/:branch_id", getBranchStaff);

module.exports = router;
