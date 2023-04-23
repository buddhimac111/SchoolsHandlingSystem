import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddSchool = () => {
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [schoolCount, setschoolcount] = useState("");
  const [teacherCount, setteachercount] = useState("");
  

  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSchool = {
      userBody: {
        name,
        email,
        
        
      },
      otherBody: {
        
        address,
        schoolCount,
        teacherCount,
      },
    };

    console.log(newSchool);

    setName("");
    
    setEmail("");
    setAddress("");
    setschoolcount("");
    setteachercount("");
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
                  <Form.Group controlId="name" className="col-12 mt-3">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter School name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="address" className="col-12 mt-3">
                    <Form.Label>School Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter School address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="studentcount" className="col-12 mt-3">
                    <Form.Label>School Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Student Count "
                      value={address}
                      onChange={(e) => setschoolcount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="teachercount" className="col-12 mt-3">
                    <Form.Label>School Teacher Count</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Teacher Count"
                      value={address}
                      onChange={(e) => setteachercount(e.target.value)}
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

export default AddSchool;
