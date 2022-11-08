const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/staff", require("./routes/staffRoute"));
app.use("/api/branch", require("./routes/branchRoute"));
app.use("/api/branch-head", require("./routes/branchHeadRoute"));
app.use("/api/customer", require("./routes/customerRoute"));
app.use("/api/parcel", require("./routes/parcelRoute"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

