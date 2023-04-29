import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import axios from "axios";
import utils from "../../utils";
import AppContext from "../../appContext";

const AddClasses = () => {
  const { token } = useContext(AppContext);
  const [name, setName] = useState("");
  const [grade, setgrade] = useState("");
  const [year, setyear] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newClass = {
      name,
      grade,
      year,
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/classes",
      headers: {
        "x-auth-token": token,
      },
      data: newClass,
    };
    axios
      .request(config)
      .then((res) => {
        alert("Class added successfully");
        setName("");
        setgrade("");
        setyear("");
      })
      .catch((err) => {
        if (err.response) alert("Error adding Class : " + err.response.data);
        else alert("Error adding Class : ");
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
                <h3 className="text-center">Add Class</h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="sname" className="col-12 mt-3">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter school name"
                      value={grade}
                      onChange={(e) => setgrade(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="name" className="col-12 mt-3">
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter class name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="year" className="col-12 mt-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter year"
                      value={year}
                      onChange={(e) => setyear(e.target.value)}
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

export default AddClasses;
