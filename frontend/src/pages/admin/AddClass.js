import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddStudent = () => {
  const [name, setName] = useState("");
  const [school, setschool] = useState("");
  const [grade, setgrade] = useState("");
  const [year, setyear] = useState("");
  const [studentCount, setstudentcount] = useState("");
  

  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newClass = {
      userBody: {
        name,
        school,
        grade,
        year,
        studentCount,
      },
      otherBody: {
        
       
      },
    };

    console.log(newClass);

    setName("");
    setschool("");
    setgrade("");
    setyear("");
    setstudentcount("");
    
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
                  <Form.Group controlId="name" className="col-12 mt-3">
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter class name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="sname" className="col-12 mt-3">
                    <Form.Label>Student Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter school name"
                      value={school}
                      onChange={(e) => setschool(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="year" className="col-12 mt-3">
                    <Form.Label>Student Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter year"
                      value={year}
                      onChange={(e) => setyear(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="studentCount" className="col-12 mt-3">
                    <Form.Label>Student Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter studentcount"
                      value={studentCount}
                      onChange={(e) => setstudentcount(e.target.value)}
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

export default AddStudent;
