const db = require("../config/db");

class Parcel {
  constructor(
    parcel_id,
    customer_id,
    parcel_name,
    parcel_status,
    sender_branch_id,
    receiver_branch_id,
    created_at,
    expected_delivery_date
  ) {
    this.parcel_id = parcel_id;
    this.customer_id = customer_id;
    this.parcel_name = parcel_name;
    this.parcel_status = parcel_status;
    this.sender_branch_id = sender_branch_id;
    this.receiver_branch_id = receiver_branch_id;
    this.created_at = created_at;
    this.expected_delivery_date = expected_delivery_date;
  }

  async create() {
    if (
      !this.parcel_id ||
      !this.customer_id ||
      !this.parcel_name ||
      !this.parcel_status ||
      !this.sender_branch_id ||
      !this.receiver_branch_id ||
      !this.created_at ||
      !this.expected_delivery_date
    ) {
      console.log({
        parcel_id: this.parcel_id,
        customer_id: this.customer_id,
        parcel_name: this.parcel_name,
        parcel_status: this.parcel_status,
        sender_branch_id: this.sender_branch_id,
        receiver_branch_id: this.receiver_branch_id,
        created_at: this.created_at,
        expected_delivery_date: this.expected_delivery_date,
      });
      return "Please fill in all fields";
    }

    let sql = "SELECT * FROM parcel WHERE parcel_id = ?";
    const [rows] = await db.execute(sql, [this.parcel_id]);
    if (rows.length > 0) {
      return "Parcel ID already exists";
    }

    sql = "SELECT * FROM customer WHERE customer_id = ?";
    const [rows2] = await db.execute(sql, [this.customer_id]);
    if (rows2.length == 0) {
      return "Customer ID does not exist";
    }

    sql = "SELECT * FROM branch WHERE branch_id = ?";
    const [rows3] = await db.execute(sql, [this.sender_branch_id]);
    if (rows3.length == 0) {
      return "Sender Branch ID does not exist";
    }

    sql = "SELECT * FROM branch WHERE branch_id = ?";
    const [rows4] = await db.execute(sql, [this.receiver_branch_id]);
    if (rows4.length == 0) {
      return "Receiver Branch ID does not exist";
    }
    if (this.sender_branch_id == this.receiver_branch_id) {
      return "Sender and Receiver Branch ID cannot be the same";
    }

    sql =
      "INSERT INTO parcel (parcel_id, customer_id, parcel_name, parcel_status, sender_branch_id, receiver_branch_id, created_at, expected_delivery_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      const result = await db.execute(sql, [
        this.parcel_id,
        this.customer_id,
        this.parcel_name,
        this.parcel_status,
        this.sender_branch_id,
        this.receiver_branch_id,
        this.created_at,
        this.expected_delivery_date,
      ]);
      return {
        message: "Parcel added successfully",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }

  static async updateParcelStatus(parcel_id, parcel_status) {
    let sql = "SELECT * FROM parcel WHERE parcel_id = ?";
    const [rows] = await db.execute(sql, [parcel_id]);
    if (rows.length == 0) {
      return "Parcel ID does not exist";
    }

    sql = "UPDATE parcel SET parcel_status = ? WHERE parcel_id = ?";
    try {
      const result = await db.execute(sql, [parcel_status, parcel_id]);
      return {
        message: "Parcel status updated successfully",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }

  static async getParcelById(parcel_id) {
    let sql = "SELECT * FROM parcel WHERE parcel_id = ?";
    const [rows] = await db.execute(sql, [parcel_id]);
    if (rows.length == 0) {
      return "Parcel ID does not exist";
    }
    return rows;
  }

  static async getParcelByCustomerId(customer_id) {
    let sql = "SELECT * FROM parcel WHERE customer_id = ?";
    const [rows] = await db.execute(sql, [customer_id]);
    if (rows.length == 0) {
      return "Customer ID does not exist";
    }
    return rows;
  }

  static async getAllParcels() {
    let sql = "SELECT * FROM parcel";
    const [rows] = await db.execute(sql);
    if (rows.length == 0) {
      return "No parcels found";
    }
    return rows;
  }

  static async deleteParcel(parcel_id) {
    let sql = "SELECT * FROM parcel WHERE parcel_id = ?";
    const [rows] = await db.execute(sql, [parcel_id]);
    if (rows.length == 0) {
      return "Parcel ID does not exist";
    }

    sql = "DELETE FROM parcel WHERE parcel_id = ?";
    try {
      const result = await db.execute(sql, [parcel_id]);
      return {
        message: "Parcel deleted successfully",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Parcel;
