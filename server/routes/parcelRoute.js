const express = require("express");
const router = express.Router();

const {
  createParcel,
  updateStatus,
  getParcelById,
  getParcelsByCustomerId,
} = require("../controllers/parcelCtrl");

router.post("/add", createParcel);
router.patch("/update", updateStatus);
router.get("/:id", getParcelById);
router.get("/customer/:customer_id", getParcelsByCustomerId);

module.exports = router;
