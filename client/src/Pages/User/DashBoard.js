import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import server from "../../config/index";
import axios from "axios";
import Table from "react-bootstrap/Table";

const DashBoard = () => {
  const [showAddParcel, setShowAddParcel] = useState(false);
  const [showParcelList, setShowParcelList] = useState(false);
  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Welcome
      </h1>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{ width: "200px", marginBottom: "20px" }}
          variant="primary"
          onClick={() => {
            setShowParcelList(false);
            setShowAddParcel(true);
          }}
        >
          Add Parcel
        </Button>{" "}
        <Button
          style={{ width: "200px", marginBottom: "20px" }}
          variant="success"
          onClick={() => {
            setShowAddParcel(false);
            setShowParcelList(true);
          }}
        >
          View Parcel
        </Button>{" "}
      </div>
      {showAddParcel && <AddParcel />}
      {showParcelList && <ParcelList />}
    </div>
  );
};

export default DashBoard;

const AddParcel = () => {
  const [parcelName, setParcelName] = useState("");
  const [senderBranch, setSenderBranch] = useState("");
  const [receiverBranch, setReceiverBranch] = useState("");
  const [customerId, setCustomerId] = useState(
    JSON.parse(localStorage.getItem("user")).customer_id
  );

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    getAllBranches();
  }, []);

  const getAllBranches = async () => {
    try {
      await axios.get(`${server}/api/branch/`).then((res) => {
        setBranch(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parcelName === "" || senderBranch === "" || receiverBranch === "") {
      alert("Please fill all the fields");
      return;
    }
    const id = JSON.parse(localStorage.getItem("user")).customer_id;
    try {
      await axios
        .post(`${server}/api/parcel/add`, {
          parcel_name: parcelName,
          sender_branch_id: senderBranch,
          receiver_branch_id: receiverBranch,
          customer_id: id,
        })
        .then((res) => {
          console.log(res);
          setParcelName("");
          setSenderBranch("");
          setReceiverBranch("");
          setCustomerId("");
          alert("Parcel Added");
        });
    } catch (error) {
      setParcelName("");
      setSenderBranch("");
      setReceiverBranch("");
      setCustomerId("");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Add Parcel
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Parcel Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Parcel Name"
              value={parcelName}
              onChange={(e) => setParcelName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Sender Branch</Form.Label>
            <Form.Control
              as="select"
              value={senderBranch}
              onChange={(e) => setSenderBranch(e.target.value)}
            >
              <option value="">Select Sender Branch</option>
              {branch.map((branch) => (
                <option value={branch.branch_id}>{branch.branch_name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Receiver Branch</Form.Label>
            <Form.Control
              as="select"
              value={receiverBranch}
              onChange={(e) => setReceiverBranch(e.target.value)}
            >
              <option value="">Select Receiver Branch</option>
              {branch.map((branch) => (
                <option value={branch.branch_id}>{branch.branch_name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button
            style={{ marginTop: "20px", width: "100px", marginBottom: "20px" }}
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

const ParcelList = () => {
  const [parcelList, setParcelList] = useState([]);

  useEffect(() => {
    getAllParcels();
  }, []);

  const getAllParcels = async () => {
    try {
      await axios
        .get(
          `${server}/api/parcel/customer/${
            JSON.parse(localStorage.getItem("user")).customer_id
          }`
        )
        .then((res) => {
          if (res.data.message === "Customer ID does not exist") {
            alert("Customer ID does not exist");
            return;
          }
          setParcelList(res.data.message);
          console.log(res.data.message);
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
        Parcel List
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
        <Table
          striped
          bordered
          hover
          style={{
            borderColor: "black",
          }}
        >
          <thead>
            <tr>
              <th>Parcel Name</th>
              <th>Sender Branch</th>
              <th>Receiver Branch</th>
              <th>Parcel Status</th>
            </tr>
          </thead>
          <tbody>
            {parcelList.map((parcel) => (
              <tr>
                <td>{parcel.parcel_name}</td>
                <td>{parcel.sender_branch_id}</td>
                <td>{parcel.receiver_branch_id}</td>
                <td>{parcel.parcel_status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
