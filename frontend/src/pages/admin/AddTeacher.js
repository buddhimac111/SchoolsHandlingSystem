import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import axios from "axios";
import AppContext from "../../appContext";

const AddTeacher = () => {
  const { token } = useContext(AppContext);

  const [nic, setNic] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();
  if (!token) return;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTeacher = {
      name,
      nic,
      email,
      phone,
      address,
      school,
      grade,
      major,
      dob,
    };

    try {
      await axios.post("/api/teachers", newTeacher);
      navigate("/admin/teachers");
    } catch (err) {
      console.log(err);
    }

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setSchool("");
    setGrade("");
    setMajor("");
    setNic("");
    setDob("");
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
                <h3 className="text-center">Add Teacher</h3>

                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <Form.Group controlId="nic" className="col-6 mt-3">
                      <Form.Label>Teacher NIC</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="name" className="col-6 mt-3">
                      <Form.Label>Teacher Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <Form.Group controlId="address" className="col-12 mt-3">
                    <Form.Label>Teacher Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter teacher address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <div className="row">
                    <Form.Group controlId="email" className="col-6 mt-3">
                      <Form.Label>Teacher Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter teacher's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="phone" className="col-6 mt-3">
                      <Form.Label>Teacher Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher's phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="school" className="col-6 mt-3">
                      <Form.Label>Teacher School</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher school"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="grade" className="col-6 mt-3">
                      <Form.Label>Teacher Class</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher's class incharge"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="dob" className="col-6 mt-3">
                      <Form.Label>Teacher Birthday</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher's birthday: yyyy/mm/dd"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="major" className="col-6 mt-3">
                      <Form.Label>Teacher Major</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher's major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
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

export default AddTeacher;
