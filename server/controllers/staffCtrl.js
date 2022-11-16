const Staff = require("../models/Staff");

exports.addStaff = async (req, res) => {
  try {
    const {
      staff_name,
      staff_email,
      staff_password,
      staff_number,
      branch_id,
    } = req.body;
    const staff = new Staff(
      staff_name,
      staff_email,
      staff_password,
      staff_number,
      branch_id
    );
    const result = await staff.create();
    res.status(201).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Staff.delete(id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Staff.getAll();
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Staff.getOne(id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { staff_name, staff_email, staff_password, staff_number } = req.body;
    const result = await Staff.update(
      id,
      staff_name,
      staff_email,
      staff_password,
      staff_number
    );
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Staff.login(email, password);
    if (result) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getBranchStaff = async (req, res) => {
  try {
    const { branch_id } = req.params;
    const result = await Staff.getBranchStaff(branch_id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};
