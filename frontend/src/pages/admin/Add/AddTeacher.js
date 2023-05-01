import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../../components/SideNav";
import TopBar from "../../../components/TopBar";
import axios from "axios";
import AppContext from "../../../appContext";
import GetClasses from "../../../hooks/getClasses";
import utils from "../../../utils";

const AddTeacher = () => {
  const { token, role } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [address, setAddress] = useState("");
  const [classe, setClasse] = useState("");
  const [DOB, setDOB] = useState("");

  const classes = GetClasses();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "sAdmin") navigate("/");
  }, [token, role, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTeacher = {
      userBody: {
        name,
        email,
        role: "teacher",
        gender,
        password,
      },
      otherBody: {
        major,
        address,
        classe,
        DOB,
      },
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/users",
      headers: {
        "x-auth-token": token,
      },
      data: newTeacher,
    };
    axios
      .request(config)
      .then((res) => {
        alert("Teacher added successfully");
        setName("");
        setEmail("");
        setGender("");
        setPassword("");
        setMajor("");
        setAddress("");
        setClasse("");
        setDOB("");
      })
      .catch((err) => {
        if (err.response) alert("Error adding teacher : " + err.response.data);
        console.log(err);
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
                <h3 className="text-center">Add Teacher</h3>

                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <Form.Group controlId="name" className="col-6 mt-3">
                      <Form.Label>Teacher Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="email" className="col-6 mt-3">
                      <Form.Label>Teacher Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter teacher's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <Form.Group controlId="password" className="col-6 mt-3">
                      <Form.Label>Teacher Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter teacher's password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <Form.Group controlId="major" className="col-6 mt-3">
                      <Form.Label>Teacher Major</Form.Label>
                      <Form.Control
                        type="major"
                        placeholder="Enter teacher's major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="grade" className="col-6 mt-3">
                      <Form.Label>Teacher Class</Form.Label>
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
                    <Form.Group controlId="dob" className="col-6 mt-3">
                      <Form.Label>Teacher Birthday</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter teacher's birthday: yyyy/mm/dd"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="button" className="col-6 mt-3">
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

export default AddTeacher;
