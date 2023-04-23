import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GetClasses from "../../hooks/getClasses";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pName, setPName] = useState("");
  const [classe, setClasse] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");

  const classes = GetClasses();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStudent = {
      userBody: {
        name,
        email,
        role: "student",
        gender,
        password,
      },
      otherBody: {
        parent: {
          name: pName,
          phone,
        },
        address,
        classe,
        DOB,
      },
    };

    console.log(newStudent);

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPName("");
    setClasse("");
    setGender("");
    setPassword("");
    setDOB("");
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
                  <Form.Group controlId="email" className="col-12 mt-3">
                    <Form.Label>Student Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter student's email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="col-12 mt-3">
                    <Form.Label>Student Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter student's password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="grade" className="col-12 mt-3">
                    <Form.Label>Student Class</Form.Label>
                    <Form.Select
                      value={classe}
                      onChange={(e) => setClasse(e.target.value)}
                    >
                      <option value="">Select a class</option>
                      {classes.map((cls) => {
                        return (
                          <option key={cls._id} value={cls._id}>
                            {cls.grade}-{cls.name} ({cls.year})
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>

                  <div className="row">
                    <Form.Group controlId="pName" className="col-6 mt-3">
                      <Form.Label>Parent Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Parent Name"
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="phone" className="col-6 mt-3">
                      <Form.Label>Parent Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Parent Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="dob" className="col-6 mt-3">
                      <Form.Label>Student Date of Birth</Form.Label>
                      <DatePicker
                        id="dob"
                        selected={DOB}
                        onChange={(date) => setDOB(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </Form.Group>

                    <Form.Group controlId="gender" className="col-6 mt-3">
                      <Form.Label>Student Gender</Form.Label>
                      <div className="row">
                        <div className="col-6">
                          <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </div>
                        <div className="col-6">
                          <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </div>
                      </div>
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
