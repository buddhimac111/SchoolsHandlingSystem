import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../../components/SideNav";
import TopBar from "../../../components/TopBar";
import utils from "../../../utils";
import AppContext from "../../../appContext";
import axios from "axios";

const AddSchool = () => {
  const { token, role } = useContext(AppContext);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token || role !== "dAdmin") navigate("/");
  }, [token, role, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSchool = {
      _id: id,
      name,
      address,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/schools",
      headers: {
        "x-auth-token": token,
      },
      data: newSchool,
    };
    axios
      .request(config)
      .then((res) => {
        alert("School added successfully");
        setName("");
        setId("");
        setAddress("");
      })
      .catch((err) => {
        if (err.response) alert("Error adding School : " + err.response.data);
        else alert("Error adding School : ");
      });
  };

  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid mt-5">
              <div className="row">
                <h3 className="text-center">Add School </h3>

                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <Form.Group controlId="id" className="col-6 mt-3">
                      <Form.Label>School Id</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter School id (id should contain 3 capital letters)"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="name" className="col-6 mt-3">
                      <Form.Label>School name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter School name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="address" className="col-6 mt-3">
                      <Form.Label>School Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter School address "
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="submitBtn" className="col-6 mt-3">
                      <Button variant="primary" type="submit" className="mt-2">
                        Submit
                      </Button>
                    </Form.Group>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSchool;
