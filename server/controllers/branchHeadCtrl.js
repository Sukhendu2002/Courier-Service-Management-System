const BranchHead = require("../models/BranchHead");

exports.addBranchHead = async (req, res) => {
  const {
    branch_head_name,
    branch_head_email,
    branch_head_password,
    branch_id,
  } = req.body;
  const branchHead = new BranchHead(
    branch_head_name,
    branch_head_email,
    branch_head_password,
    branch_id
  );
  const result = await branchHead.create();
  res.send(result);
};

exports.loginBranchHead = async (req, res) => {
  const { branch_head_email, branch_head_password } = req.body;
  const result = await BranchHead.login(
    branch_head_email,
    branch_head_password
  );
  res.send(result);
};
