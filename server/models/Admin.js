const db = require("../config/db");

class Admin {
  static async login(email, password) {
    const sql =
      "SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?";
    const [rows] = await db.execute(sql, [email, password]);
    return rows[0];
  }
}

module.exports = Admin;
