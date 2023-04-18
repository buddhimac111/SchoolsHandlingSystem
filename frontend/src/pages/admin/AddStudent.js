import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import axios from "axios";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStudent = {
      name,
      email,
      phone,
      address,
      school,
      grade,
    };

    try {
      await axios.post("/api/students", newStudent);
      navigate("/admin/students");
    } catch (err) {
      console.log(err);
    }

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setSchool("");
    setGrade("");
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
                <h3 className="text-center">Add Student</h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name" className="col-12 mt-3">
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter student name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="address" className="col-12 mt-3">
                    <Form.Label>Student Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter student address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <div className="row">
                    <Form.Group controlId="email" className="col-6 mt-3">
                      <Form.Label>Student Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter student's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="phone" className="col-6 mt-3">
                      <Form.Label>Student Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter student's phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="school" className="col-6 mt-3">
                      <Form.Label>Student School</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter student school"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="grade" className="col-6 mt-3">
                      <Form.Label>Student Class</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter student's class"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </Form.Group>
                  </div>

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

export default AddStudent;
