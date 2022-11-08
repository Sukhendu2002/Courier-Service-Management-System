const Admin = require("../models/Admin");
exports.login = (req, res) => {
  const { email, password } = req.body;
  Admin.login(email, password)
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Login successful", data: result });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
