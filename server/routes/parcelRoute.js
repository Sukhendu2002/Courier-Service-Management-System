const express = require("express");
const router = express.Router();

const {
  createParcel,
  updateStatus,
  getParcelById,
  getParcelsByCustomerId,
  getAllParcels,
  deleteParcel,
  filterParcels,
} = require("../controllers/parcelCtrl");

router.post("/add", createParcel);
router.patch("/update", updateStatus);
router.get("/:id", getParcelById);
router.get("/customer/:customer_id", getParcelsByCustomerId);
router.get("/", getAllParcels);
router.delete("/delete/:parcel_id", deleteParcel);
router.get("/product/filter/", filterParcels);

module.exports = router;
