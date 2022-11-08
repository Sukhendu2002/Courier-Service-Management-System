const db = require("../config/db");

class Staff {
  constructor(
    staff_name,
    staff_email,
    staff_password,
    staff_number,
    branch_id
  ) {
    this.staff_name = staff_name;
    this.staff_email = staff_email;
    this.staff_password = staff_password;
    this.staff_number = staff_number;
    this.branch_id = branch_id;
  }
  async create() {
    if (
      !this.staff_name ||
      !this.staff_email ||
      !this.staff_password ||
      !this.staff_number ||
      !this.branch_id
    ) {
      return "Please fill in all fields";
    }
    let sql = "SELECT * FROM staff WHERE staff_email = ?";
    const [rows] = await db.execute(sql, [this.staff_email]);
    if (rows.length > 0) {
      return "Email already exists";
    }
    //check if branch exists
    sql = "SELECT * FROM branch WHERE branch_id = ?";
    const [branch] = await db.execute(sql, [this.branch_id]);
    if (branch.length === 0) {
      return "Branch does not exist";
    }
    sql =
      "INSERT INTO staff (staff_name, staff_email, staff_password, staff_number) VALUES (?, ?, ?, ?)";
    try {
      const result = await db.execute(sql, [
        this.staff_name,
        this.staff_email,
        this.staff_password,
        this.staff_number,
      ]);
      return {
        message: "Staff added successfully",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }

  static async login(email, password) {
    const sql =
      "SELECT * FROM staff WHERE staff_email = ? AND staff_password = ?";
    const [rows] = await db.execute(sql, [email, password]);
    return rows[0];
  }

  static async getAll() {
    const sql = "SELECT * FROM staff";
    const [rows] = await db.execute(sql);
    return rows;
  }
  static async getOne(id) {
    const sql = "SELECT * FROM staff WHERE staff_id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }
  static async update(
    id,
    staff_name,
    staff_email,
    staff_password,
    staff_number
  ) {
    const sql =
      "UPDATE staff SET staff_name = ?, staff_email = ?, staff_password = ?, staff_number = ? WHERE staff_id = ?";
    const result = await db.execute(sql, [
      staff_name,
      staff_email,
      staff_password,
      staff_number,
      id,
    ]);
    return result;
  }
  static async delete(id) {
    const sql = "DELETE FROM staff WHERE staff_id = ?";
    const result = await db.execute(sql, [id]);
    return result;
  }

  static async getBranchStaff(branch_id) {
    const sql = "SELECT * FROM staff WHERE branch_id = ?";
    const [rows] = await db.execute(sql, [branch_id]);
    return rows;
  }
}

module.exports = Staff;
