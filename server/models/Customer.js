const db = require("../config/db");
class Customer {
  constructor(customer_name, customer_email, customer_password) {
    this.customer_name = customer_name;
    this.customer_email = customer_email;
    this.customer_password = customer_password;
  }
  async create() {
    if (
      !this.customer_name ||
      !this.customer_email ||
      !this.customer_password
    ) {
      return "Please fill in all fields";
    }
    let sql = "SELECT * FROM customer WHERE customer_email = ?";
    const [rows] = await db.execute(sql, [this.customer_email]);
    if (rows.length > 0) {
      return "Email already exists";
    }
    sql =
      "INSERT INTO customer (customer_name, customer_email, customer_password) VALUES (?, ?, ?)";
    try {
      const result = await db.execute(sql, [
        this.customer_name,
        this.customer_email,
        this.customer_password,
      ]);
      return {
        message: "Customer added successfully",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }

  static async login(email, password) {
    console.log(email, password);
    const sql =
      "SELECT * FROM customer WHERE customer_email = ? AND customer_password = ?";
    const [rows] = await db.execute(sql, [email, password]);
    return rows[0];
  }

  static async getAllCustomers() {
    const sql = "SELECT * FROM customer";
    const [rows] = await db.execute(sql);
    return rows;
  }
}

module.exports = Customer;
