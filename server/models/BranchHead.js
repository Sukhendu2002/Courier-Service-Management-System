const db = require("../config/db");
class BranchHead {
  constructor(
    branch_head_name,
    branch_head_email,
    branch_head_password,
    branch_id
  ) {
    this.branch_head_name = branch_head_name;
    this.branch_head_email = branch_head_email;
    this.branch_head_password = branch_head_password;
    this.branch_id = branch_id;
  }
  async create() {
    if (!this.branch_head_name || !this.branch_head_email || !this.branch_id) {
      return "Please fill in all fields";
    }
    let sql = "SELECT * FROM branch_head WHERE branch_head_email = ?";
    const [rows] = await db.execute(sql, [this.branch_head_email]);
    if (rows.length > 0) {
      return "Branch Head already exists";
    }
    //check if branch exists
    sql = "SELECT * FROM branch WHERE branch_id = ?";
    const [branch] = await db.execute(sql, [this.branch_id]);
    if (branch.length === 0) {
      return "Branch does not exist";
    }
    sql =
      "INSERT INTO branch_head (branch_head_name, branch_head_email,branch_head_password, branch_id) VALUES (?, ?, ?,?)";
    try {
      const result = await db.execute(sql, [
        this.branch_head_name,
        this.branch_head_email,
        this.branch_head_password,
        this.branch_id,
      ]);
      return {
        message: "Branch Head added successfully",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }

  static async login(email, password) {
    const sql =
      "SELECT * FROM branch_head WHERE branch_head_email = ? AND branch_head_password = ?";
    const [rows] = await db.execute(sql, [email, password]);
    return rows[0];
  }

  static async getBranchHead(branch_head_id) {
    const sql = "SELECT * FROM branch_head WHERE branch_head_id = ?";
    const [rows] = await db.execute(sql, [branch_head_id]);
    return rows[0];
  }

  static async getBranchHeads() {
    const sql = "SELECT * FROM branch_head";
    const [rows] = await db.execute(sql);
    return rows;
  }

  static async updateBranchHead(
    branch_head_id,
    branch_head_name,
    branch_head_email,
    branch_head_password,
    branch_id
  ) {
    const sql =
      "UPDATE branch_head SET branch_head_name = ?, branch_head_email = ?, branch_head_password = ?, branch_id = ? WHERE branch_head_id = ?";
    const [rows] = await db.execute(sql, [
      branch_head_name,
      branch_head_email,
      branch_head_password,
      branch_id,
      branch_head_id,
    ]);
    return rows;
  }

  static async deleteBranchHead(branch_head_id) {
    const sql = "DELETE FROM branch_head WHERE branch_head_id = ?";
    const [rows] = await db.execute(sql, [branch_head_id]);
    return rows;
  }
}

module.exports = BranchHead;
