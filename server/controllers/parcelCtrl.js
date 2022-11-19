const Parcel = require("../models/Parcel");

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

exports.createParcel = async (req, res) => {
  const { parcel_name, customer_id, sender_branch_id, receiver_branch_id } =
    req.body;

  const parcel_id = genRanHex(6);
  const parcel_status = "In Transit";
  const created_at = new Date();
  const expected_delivery_date = new Date(
    created_at.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  console.log({
    parcel_id,
    customer_id,
    parcel_name,
    parcel_status,
    sender_branch_id,
    receiver_branch_id,
    created_at,
    expected_delivery_date,
  });

  try {
    const parcel = new Parcel(
      parcel_id,
      customer_id,
      parcel_name,
      parcel_status,
      sender_branch_id,
      receiver_branch_id,
      created_at,
      expected_delivery_date
    );

    const result = await parcel.create();
    res.status(201).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.updateStatus = async (req, res) => {
  const {
    parcel_id,
    parcel_status,
    parcel_name,
    sender_branch_id,
    receiver_branch_id,
    expected_delivery_date,
  } = req.body;

  try {
    const result = await Parcel.updateParcelStatus(
      parcel_id,
      parcel_status,
      parcel_name,
      sender_branch_id,
      receiver_branch_id,
      expected_delivery_date
    );
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.getParcelById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Parcel.getParcelById(id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.getParcelsByCustomerId = async (req, res) => {
  const { customer_id } = req.params;
  console.log(customer_id);
  try {
    const result = await Parcel.getParcelByCustomerId(customer_id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllParcels = async (req, res) => {
  try {
    const result = await Parcel.getAllParcels();
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteParcel = async (req, res) => {
  const { parcel_id } = req.params;
  try {
    const result = await Parcel.deleteParcel(parcel_id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.filterParcels = async (req, res) => {
  const { status, senderBranch, receiverBranch, createdAt } = req.query;
  try {
    const result = await Parcel.filterParcels(
      status,
      senderBranch,
      receiverBranch,
      createdAt
    );
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};
