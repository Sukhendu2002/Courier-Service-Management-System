const Branch = require("../models/Branch");

exports.getBranches = async (req, res) => {
  const branches = await Branch.getAll();
  res.json(branches);
};

exports.addBranch = async (req, res) => {
  try {
    const { branch_name, branch_location } = req.body;
    const branch = new Branch(branch_name, branch_location);
    const result = await branch.create();
    res.status(201).json({ message: result });
  } catch (err) {
    console.log(err);
  }
};

exports.getOneBranch = async (req, res) => {
  const id = req.params.id;
  const branch = await Branch.getOne(id);
  res.json(branch);
};

exports.updateBranch = async (req, res) => {
  const id = req.params.id;
  const { branch_name, branch_location } = req.body;
  const result = await Branch.update(id, branch_name, branch_location);
  res.json(result);
};

exports.deleteBranch = async (req, res) => {
  const id = req.params.id;
  const result = await Branch.delete(id);
  res.json(result);
};
