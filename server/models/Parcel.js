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

  static async updateParcelStatus(
    parcel_id,
    parcel_status,
    parcel_name,
    sender_branch_id,
    receiver_branch_id,
    expected_delivery_date
  ) {
    let sql = "SELECT * FROM parcel WHERE parcel_id = ?";
    const [rows] = await db.execute(sql, [parcel_id]);
    if (rows.length == 0) {
      return "Parcel ID does not exist";
    }

    sql = "SELECT * FROM branch WHERE branch_id = ?";
    const [rows2] = await db.execute(sql, [sender_branch_id]);
    if (rows2.length == 0) {
      return "Sender Branch ID does not exist";
    }

    sql = "SELECT * FROM branch WHERE branch_id = ?";
    const [rows3] = await db.execute(sql, [receiver_branch_id]);
    if (rows3.length == 0) {
      return "Receiver Branch ID does not exist";
    }
    if (sender_branch_id == receiver_branch_id) {
      return "Sender and Receiver Branch ID cannot be the same";
    }

    sql =
      "UPDATE parcel SET parcel_status = ?, parcel_name = ?, sender_branch_id = ?, receiver_branch_id = ?, expected_delivery_date = ? WHERE parcel_id = ?";
    try {
      const result = await db.execute(sql, [
        parcel_status,
        parcel_name,
        sender_branch_id,
        receiver_branch_id,
        expected_delivery_date,
        parcel_id,
      ]);
      return {
        message: "Parcel updated successfully",
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

  static async filterParcels(status, senderBranch, receiverBranch, createdAt) {
    console.log(status, senderBranch, receiverBranch, createdAt);
    //drop everything from temp table
    let sql;

    //put all parcels in temp table
    // sql = "INSERT INTO temp SELECT * FROM parcel";
    // await db.execute(sql);

    // if (status != "") {
    //   sql = "DELETE FROM temp";
    //   await db.execute(sql);

    //   sql = "SELECT * FROM parcel WHERE parcel_status = ?";
    //   const [rows] = await db.execute(sql, [status]);
    //   if (rows.length == 0) {
    //     return "No parcels found";
    //   }
    //   console.log(rows);
    //   // indert the data into temp table
    //   sql =
    //     "INSERT INTO temp (parcel_id,customer_id, parcel_name,sender_branch_id, receiver_branch_id, created_at, expected_delivery_date,parcel_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //   try {
    //     for (let i = 0; i < rows.length; i++) {
    //       const result = await db.execute(sql, [
    //         rows[i].parcel_id,
    //         rows[i].customer_id,
    //         rows[i].parcel_name,
    //         rows[i].sender_branch_id,
    //         rows[i].receiver_branch_id,
    //         rows[i].created_at,
    //         rows[i].expected_delivery_date,
    //         rows[i].parcel_status,
    //       ]);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // if (senderBranch != "") {
    //   sql = "SELECT * FROM temp WHERE sender_branch_id = ?";
    //   const [rows2] = await db.execute(sql, [senderBranch]);
    //   if (rows2.length == 0) {
    //     return "No parcels found";
    //   }
    //   //delete everything from temp table
    //   sql = "DELETE FROM temp";
    //   await db.execute(sql);
    //   // indert the data into temp table
    //   sql =
    //     "INSERT INTO temp (parcel_id,customer_id, parcel_name,sender_branch_id, receiver_branch_id, created_at, expected_delivery_date,parcel_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //   try {
    //     for (let i = 0; i < rows2.length; i++) {
    //       const result = await db.execute(sql, [
    //         rows2[i].parcel_id,
    //         rows2[i].customer_id,
    //         rows2[i].parcel_name,
    //         rows2[i].sender_branch_id,
    //         rows2[i].receiver_branch_id,
    //         rows2[i].created_at,
    //         rows2[i].expected_delivery_date,
    //         rows2[i].parcel_status,
    //       ]);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // if (receiverBranch != "") {
    //   sql = "SELECT * FROM temp WHERE receiver_branch_id = ?";
    //   const [rows3] = await db.execute(sql, [receiverBranch]);
    //   if (rows3.length == 0) {
    //     return "No parcels found";
    //   }
    //   //delete everything from temp table
    //   sql = "DELETE FROM temp";
    //   await db.execute(sql);
    //   // indert the data into temp table
    //   sql =
    //     "INSERT INTO temp (parcel_id,customer_id, parcel_name,sender_branch_id, receiver_branch_id, created_at, expected_delivery_date,parcel_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //   try {
    //     for (let i = 0; i < rows3.length; i++) {
    //       const result = await db.execute(sql, [
    //         rows3[i].parcel_id,
    //         rows3[i].customer_id,
    //         rows3[i].parcel_name,
    //         rows3[i].sender_branch_id,
    //         rows3[i].receiver_branch_id,
    //         rows3[i].created_at,
    //         rows3[i].expected_delivery_date,
    //         rows3[i].parcel_status,
    //       ]);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // if (
    //   status != " " &&
    //   senderBranch != " " &&
    //   receiverBranch != " " &&
    //   createdAt != " "
    // ) {
    //   sql =`
    //     "SELECT * FROM parcel WHERE parcel_status = ? AND sender_branch_id = ? AND receiver_branch_id = ? AND created_at = ?";`
    //   const [rows] = await db.execute(sql, [
    //     status,
    //     senderBranch,
    //     receiverBranch,
    //     createdAt,
    //   ]);
    //   if (rows.length == 0) {
    //     return "No parcels found";
    //   }
    //   return rows;
    // }

    sql = "SELECT * FROM parcel WHERE ";
    if (status != "") {
      sql += "AND parcel_status = ?";
    }
    if (senderBranch != "") {
      sql += " AND sender_branch_id = ?";
    }
    if (receiverBranch != "") {
      sql += " AND receiver_branch_id = ?";
    }
    if (createdAt != "") {
      sql += " AND created_at = ?";
    }
    // console.log(sql);
    //remove the first AND from the query
    sql = sql.replace("AND", "");
    //make an array of the values to be inserted into the query , insert the values that are not empty
    const values = [];
    if (status != "") {
      values.push(status);
    }
    if (senderBranch != "") {
      values.push(senderBranch);
    }
    if (receiverBranch != "") {
      values.push(receiverBranch);
    }
    if (createdAt != "") {
      values.push(createdAt);
    }
    const [rows] = await db.execute(sql, values);
    if (rows.length == 0) {
      return "No parcels found";
    }
    return rows;
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = Parcel;
