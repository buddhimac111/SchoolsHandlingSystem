import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../../components/SideNav";
import TopBar from "../../../components/TopBar";
import axios from "axios";
import utils from "../../../utils";
import AppContext from "../../../appContext";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const AddSubject = () => {
  const navigate = useNavigate();
  const { token, role } = useContext(AppContext);
  const [name, setName] = useState("");
  useEffect(() => {
    if (!token || role !== "dAdmin") navigate("/");
  }, [token, role, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/subjects",
      headers: {
        "x-auth-token": token,
      },
      data: { _id: name },
    };
    axios
      .request(config)
      .then((res) => {
        alert("Subject added successfully");
        navigate("/admin/subjects");
      })
      .catch((err) => {
        if (err.response) alert("Error adding Subject : " + err.response.data);
        else alert("Error adding Subject : ");
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
                <h3 className="text-center">Add Subject</h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="sname" className="col-12 mt-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Subject Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-2">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubject;
