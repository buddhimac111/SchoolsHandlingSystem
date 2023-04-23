import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddSAdmin = () => {
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [schoolname, setschoolname] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");

  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSAdmin = {
      userBody: {
        name,
        email,
        role: "SAdmin",
        gender,
        password,
      },
      otherBody: {
        
        address,
        schoolname,
        DOB,
      },
    };

    console.log(newSAdmin);

    setName("");
    
    setEmail("");
    setAddress("");
    setschoolname("");
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
                <h3 className="text-center">Add School Admin</h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name" className="col-12 mt-3">
                    <Form.Label>SAdmin Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter SAdmin name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="address" className="col-12 mt-3">
                    <Form.Label>SAdmin Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter SAdmin address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email" className="col-12 mt-3">
                    <Form.Label>SAdmin Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter SAdmin's email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="col-12 mt-3">
                    <Form.Label>Student Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter SAdmin's password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  

                  <div className="row">
                    

                    
                      
                    <Form.Group controlId="dob" className="col-6 mt-3">
                      <Form.Label>School Admin Date of birth</Form.Label>
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
                    <Form.Group controlId="schoolname" className="col-12 mt-3">
                    <Form.Label>School name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter school name"
                      value={address}
                      onChange={(e) => setschoolname(e.target.value)}
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

export default AddSAdmin;
