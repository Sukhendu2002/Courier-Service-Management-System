const Customer = require("../models/Customer");

exports.create = async (req, res) => {
  const { customer_name, customer_email, customer_password } = req.body;
  const customer = new Customer(
    customer_name,
    customer_email,
    customer_password
  );
  const result = await customer.create();
  res.send(result);
};

exports.login = async (req, res) => {
  const { customer_email, customer_password } = req.body;
  const result = await Customer.login(customer_email, customer_password);
  res.send(result);
};

exports.getAllCustomers = async (req, res) => {
  const result = await Customer.getAllCustomers();
  res.send(result);
}
