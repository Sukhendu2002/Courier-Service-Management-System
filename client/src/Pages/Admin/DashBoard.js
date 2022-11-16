import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import server from "../../config/index";
import axios from "axios";
import Table from "react-bootstrap/Table";

const DashBoard = () => {
  // const [loading, setLoading] = useState(false);
  // Branches
  const [showBranches, setShowBranches] = useState(false);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [showDeleteBranch, setShowDeleteBranch] = useState(false);
  // Staff
  const [showStaff, setShowStaff] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showDeleteStaff, setShowDeleteStaff] = useState(false);
  //parcel
  const [showParcel, setShowParcel] = useState(false);
  const [showAddParcel, setShowAddParcel] = useState(false);
  const [showDeleteParcel, setShowDeleteParcel] = useState(false);

  // const getBranches = async () => {
  //   try {
  //     await axios.get(`${server}/api/branch/`).then((res) => {
  //       setData(res.data);
  //       console.log(data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        DashBoard
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="primary"
            onClick={() => {
              setShowAddBranch(false);
              setShowDeleteBranch(false);
              setShowStaff(false);
              setShowAddStaff(false);
              setShowDeleteStaff(false);
              setShowParcel(false);
              setShowAddParcel(false);
              setShowDeleteParcel(false);
              setShowBranches(true);
            }}
          >
            View Branches
          </Button>{" "}
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="success"
            onClick={() => {
              setShowBranches(false);
              setShowDeleteBranch(false);
              setShowStaff(false);
              setShowAddStaff(false);
              setShowDeleteStaff(false);
              setShowParcel(false);
              setShowAddParcel(false);
              setShowDeleteParcel(false);

              setShowAddBranch(true);
            }}
          >
            Add Branch
          </Button>{" "}
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="danger"
            onClick={() => {
              setShowBranches(false);
              setShowAddBranch(false);
              setShowStaff(false);
              setShowAddStaff(false);
              setShowDeleteStaff(false);
              setShowParcel(false);
              setShowAddParcel(false);
              setShowDeleteParcel(false);

              setShowDeleteBranch(true);
            }}
          >
            Delete Branch
          </Button>{" "}
        </div>
        <div>
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="primary"
            onClick={() => {
              setShowBranches(false);
              setShowAddBranch(false);
              setShowDeleteBranch(false);
              setShowAddStaff(false);
              setShowDeleteStaff(false);
              setShowParcel(false);
              setShowAddParcel(false);
              setShowDeleteParcel(false);

              setShowStaff(true);
            }}
          >
            View Staff
          </Button>{" "}
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="success"
            onClick={() => {
              setShowBranches(false);
              setShowAddBranch(false);
              setShowDeleteBranch(false);
              setShowStaff(false);
              setShowDeleteStaff(false);
              setShowParcel(false);
              setShowAddParcel(false);
              setShowDeleteParcel(false);

              setShowAddStaff(true);
            }}
          >
            Add Staff
          </Button>{" "}
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="danger"
            onClick={() => {
              setShowBranches(false);
              setShowAddBranch(false);
              setShowDeleteBranch(false);
              setShowStaff(false);
              setShowAddStaff(false);
              setShowParcel(false);
              setShowAddParcel(false);
              setShowDeleteParcel(false);

              setShowDeleteStaff(true);
            }}
          >
            Delete Staff
          </Button>{" "}
        </div>
        <div>
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="primary"
            onClick={() => {
              setShowBranches(false);
              setShowAddBranch(false);
              setShowDeleteBranch(false);
              setShowStaff(false);
              setShowAddStaff(false);
              setShowDeleteStaff(false);
              setShowAddParcel(false);
              setShowDeleteParcel(false);

              setShowParcel(true);
            }}
          >
            View Parcels
          </Button>{" "}
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="success"
          >
            Add Parcel
          </Button>{" "}
          <Button
            style={{ width: "200px", marginBottom: "20px" }}
            variant="danger"
          >
            Delete Parcel
          </Button>{" "}
        </div>
      </div>
      {showBranches && <ShowBranches />}
      {showAddBranch && <AddBranch />}
      {showDeleteBranch && <DeleteBranch />}
      {showStaff && <ShowStaff />}
      {showAddStaff && <AddStaff />}
      {showDeleteStaff && <DeleteStaff />}
      {showParcel && <ShowParcel />}
    </div>
  );
};

export default DashBoard;

const ShowBranches = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const init = async () => {
      console.log("init");
      try {
        await axios.get(`${server}/api/branch/`).then((res) => {
          setData(res.data);
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Branches
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {data.map((branch) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3>{branch.branch_name}</h3>
            <h5>{branch.address}</h5>
            <h5>{branch.city}</h5>
            <h5>{branch.state}</h5>
            <h5>{branch.pincode}</h5>
          </div>
        ))} */}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Branch Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((branch) => (
              <tr>
                <td>{branch.branch_id}</td>
                <td>{branch.branch_name}</td>
                <td>{branch.branch_location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const AddBranch = () => {
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${server}/api/branch/add`, {
          branch_name: branchName,
          branch_location: address,
        })
        .then((res) => {
          console.log(res);
          alert("Branch Added");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Add Branch
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Branch Name</Form.Label>
            <Form.Control
              onChange={(e) => setBranchName(e.target.value)}
              type="text"
              placeholder="Enter Branch Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Address"
            />
          </Form.Group>
        </Form>
        <Button
          style={{ width: "200px", marginTop: "20px" }}
          variant="success"
          onClick={handleSubmit}
        >
          Add Branch
        </Button>{" "}
      </div>
    </div>
  );
};

const DeleteBranch = () => {
  const [branchId, setBranchId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (branchId === "") {
      alert("Please enter Branch ID");
      return;
    }
    try {
      await axios
        .delete(`${server}/api/branch/delete/${branchId}`)
        .then((res) => {
          console.log(res);
          alert("Branch Deleted");
          //access the dashboard state and change the showDeleteBranch to false
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Delete Branch
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Branch ID</Form.Label>
            <Form.Control
              onChange={(e) => setBranchId(e.target.value)}
              type="text"
              placeholder="Enter Branch ID"
            />
          </Form.Group>
        </Form>
        <Button
          onClick={handleSubmit}
          style={{ width: "200px", marginTop: "20px" }}
          variant="danger"
        >
          Delete Branch
        </Button>{" "}
      </div>
    </div>
  );
};

const ShowStaff = () => {
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    getAllBranches();
    const init = async () => {
      console.log("init");
      try {
        await axios.get(`${server}/api/staff/getall`).then((res) => {
          setData(res.data.message);
          console.log(res.data.message);
        });
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const getAllBranches = async () => {
    try {
      await axios.get(`${server}/api/branch/`).then((res) => {
        setBranch(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Staff
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Staff Name</th>
              <th>Branch Email</th>
              <th>Branch ID</th>
              <th>Branch Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((staff) => (
              <tr>
                <td>{staff.staff_id}</td>
                <td>{staff.staff_name}</td>
                <td>{staff.staff_email}</td>
                <td>{staff.branch_id}</td>
                <td>
                  {branch.map((b) => {
                    if (b.branch_id === staff.branch_id) {
                      return b.branch_name;
                    }
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const AddStaff = () => {
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [branchId, setBranchId] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffNo, setStaffNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      staffName === "" ||
      staffEmail === "" ||
      branchId === "" ||
      staffPassword === "" ||
      staffNo === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      await axios
        .post(`${server}/api/staff/add`, {
          staff_name: staffName,
          staff_email: staffEmail,
          staff_number: staffNo,
          staff_password: staffPassword,
          branch_id: branchId,
        })
        .then((res) => {
          console.log(res);
          alert("Staff Added");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Add Staff
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Staff Name</Form.Label>
            <Form.Control
              onChange={(e) => setStaffName(e.target.value)}
              type="text"
              placeholder="Enter Staff Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Staff Email</Form.Label>
            <Form.Control
              onChange={(e) => setStaffEmail(e.target.value)}
              type="text"
              placeholder="Enter Staff Email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Branch ID</Form.Label>
            <Form.Control
              onChange={(e) => setBranchId(e.target.value)}
              type="text"
              placeholder="Enter Branch ID"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Staff Password</Form.Label>
            <Form.Control
              onChange={(e) => setStaffPassword(e.target.value)}
              type="text"
              placeholder="Enter Staff Password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Staff Number</Form.Label>
            <Form.Control
              onChange={(e) => setStaffNo(e.target.value)}
              type="text"
              placeholder="Enter Staff Number"
            />
          </Form.Group>
        </Form>
        <Button
          onClick={handleSubmit}
          style={{ width: "200px", marginTop: "20px" }}
          variant="success"
        >
          Add Staff
        </Button>{" "}
      </div>
    </div>
  );
};

const DeleteStaff = () => {
  const [staffId, setStaffId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (staffId === "") {
      alert("Please fill all the fields");
      return;
    }
    try {
      await axios
        .delete(`${server}/api/staff/delete/${staffId}`)
        .then((res) => {
          console.log(res);
          alert("Staff Deleted");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Delete Staff
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Staff ID</Form.Label>
            <Form.Control
              onChange={(e) => setStaffId(e.target.value)}
              type="text"
              placeholder="Enter Staff ID"
            />
          </Form.Group>
        </Form>
        <Button
          onClick={handleSubmit}
          style={{ width: "200px", marginTop: "20px" }}
          variant="danger"
        >
          Delete Staff
        </Button>{" "}
      </div>
    </div>
  );
};

const ShowParcel = () => {
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState([]);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getAllBranches();
    getAllCustomers();
    axios.get(`${server}/api/parcel/`).then((res) => {
      setData(res.data.message);
      console.log(res.data.message);
    });
  }, []);

  const getAllBranches = async () => {
    try {
      await axios.get(`${server}/api/branch/`).then((res) => {
        setBranch(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCustomers = async () => {
    try {
      await axios.get(`${server}/api/customer/`).then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Show Parcel
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Customer ID</th>
              <th>Parcel Name</th>
              <th>Parcel Status</th>
              <th>Sent From</th>
              <th>Received At</th>
              <th>Request Date</th>
              <th>Delivery/Expected Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parcel) => (
              <tr>
                <td>{parcel.parcel_id}</td>
                <td>
                  {customer.map((cust) => {
                    if (cust.customer_id === parcel.customer_id) {
                      return cust.customer_email;
                    }
                  })}
                </td>
                <td>{parcel.parcel_name}</td>
                <td>{parcel.parcel_status}</td>
                <td>
                  {branch.map((branch) => {
                    if (branch.branch_id === parcel.sender_branch_id) {
                      return branch.branch_name;
                    }
                  })}
                </td>
                <td>
                  {branch.map((branch) => {
                    if (branch.branch_id === parcel.receiver_branch_id) {
                      return branch.branch_name;
                    }
                  })}
                </td>
                <td>
                  {parcel.created_at.substring(8, 10) +
                    "/" +
                    parcel.created_at.substring(5, 7) +
                    "/" +
                    parcel.created_at.substring(0, 4)}
                </td>
                <td>
                  {parcel.expected_delivery_date.substring(8, 10) +
                    "/" +
                    parcel.expected_delivery_date.substring(5, 7) +
                    "/" +
                    parcel.expected_delivery_date.substring(0, 4)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
