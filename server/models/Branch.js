const db = require("../config/db");
class Branch {
  constructor(branch_name, branch_location) {
    this.branch_name = branch_name;
    this.branch_location = branch_location;
  }
  async create() {
    if (!this.branch_name || !this.branch_location) {
      return "Please fill in all fields";
    }
    let sql = "SELECT * FROM branch WHERE branch_name = ?";
    const [rows] = await db.execute(sql, [this.branch_name]);
    if (rows.length > 0) {
      return "Branch already exists";
    }
    sql = "INSERT INTO branch (branch_name, branch_location) VALUES (?, ?)";
    try {
      const result = await db.execute(sql, [
        this.branch_name,
        this.branch_location,
      ]);
      return {
        message: "Branch added successfully",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }
  static async getAll() {
    const sql = "SELECT * FROM branch";
    const [rows] = await db.execute(sql);
    return rows;
  }
  static async getOne(id) {
    const sql = "SELECT * FROM branch WHERE branch_id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }
  static async update(id, branch_name, branch_location) {
    const sql =
      "UPDATE branch SET branch_name = ?, branch_location = ? WHERE branch_id = ?";
    const [rows] = await db.execute(sql, [branch_name, branch_location, id]);
    return rows;
  }
  static async delete(id) {
    const sql = "DELETE FROM branch WHERE branch_id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows;
  }
}

module.exports = Branch;
