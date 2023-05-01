import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../../components/SideNav";
import TopBar from "../../../components/TopBar";
import axios from "axios";
import AppContext from "../../../appContext";
import GetClasses from "../../../hooks/getClasses";
import utils from "../../../utils";
import "../admin.css";

const EditStudent = () => {
  const { id } = useParams();
  const { token, role } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [parent, setParent] = useState({});
  const [address, setAddress] = useState("");
  const [classe, setClasse] = useState("");
  const [DOB, setDOB] = useState("");

  const classes = GetClasses();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "sAdmin") navigate("/");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/students/" + id,
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setAddress(res.data.address);
        setParent(res.data.parent);
        setDOB(res.data.DOB.split("T")[0]);
        setClasse(res.data.classe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, role, navigate, id]);
  function handleUserSubmit(event) {
    event.preventDefault();
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/users/" + id,
      headers: {
        "x-auth-token": token,
      },
      data: {
        name,
        email,
        password,
        gender,
      },
    };
    axios
      .request(config)
      .then((res) => {
        alert("User edited successfully");
      })
      .catch((err) => {
        if (err.response) alert("Error editing user : " + err.response.data);
        console.log(err);
      });
  }
  const handleStudentSubmit = async (event) => {
    event.preventDefault();

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/students/" + id,
      headers: {
        "x-auth-token": token,
      },
      data: {
        address,
        DOB,
        parent,
      },
    };
    axios
      .request(config)
      .then((res) => {
        alert("Student Edited successfully");
      })
      .catch((err) => {
        if (err.response) alert("Error editing student : " + err.response.data);
        console.log(err);
      });
  };
  function handleChangeClass(event) {
    event.preventDefault();
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/students/" + id,
      headers: {
        "x-auth-token": token,
      },
      data: {
        classe,
      },
    };
    axios
      .request(config)
      .then((res) => {
        alert("Student class changed successfully");
      })
      .catch((err) => {
        if (err.response)
          alert("Error changing student class : " + err.response.data);
        console.log(err);
      });
  }

  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid">
              <div className="row tblArea">
                <h3 className="text-center">Edit User Details</h3>
                <Form onSubmit={handleUserSubmit}>
                  <div className="row">
                    <Form.Group controlId="name" className="col-6 mt-3">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter student name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="email" className="col-6 mt-3">
                      <Form.Label>Student Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter student's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="password" className="col-6 mt-3">
                      <Form.Label>Student Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter student's password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <Form.Group controlId="button" className="col-6 mt-3">
                      <Button variant="primary" type="submit" className="mt-2">
                        Edit
                      </Button>
                    </Form.Group>
                  </div>
                </Form>

                <h3 className="text-center mt-3">Edit Student Details</h3>

                <Form onSubmit={handleStudentSubmit}>
                  <div className="row"></div>

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
                    <Form.Group controlId="major" className="col-6 mt-3">
                      <Form.Label>Parent Name</Form.Label>
                      <Form.Control
                        type="major"
                        placeholder="Enter student's major"
                        value={parent.name}
                        onChange={(e) => {
                          const newParent = { ...parent };
                          newParent.name = e.target.value;
                          setParent(newParent);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="major" className="col-6 mt-3">
                      <Form.Label>Parent Phone</Form.Label>
                      <Form.Control
                        type="major"
                        placeholder="Enter student's major"
                        value={parent.phone}
                        onChange={(e) => {
                          const newParent = { ...parent };
                          newParent.phone = e.target.value;
                          setParent(newParent);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="dob" className="col-6 mt-3">
                      <Form.Label>Student Birthday</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter student's birthday: yyyy/mm/dd"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="button" className="col-6 mt-3">
                      <Button variant="primary" type="submit" className="mt-2">
                        Edit
                      </Button>
                    </Form.Group>
                  </div>
                </Form>

                <h3 className="text-center mt-3">Change Student Class</h3>

                <Form onSubmit={handleChangeClass}>
                  <div className="row">
                    <Form.Group controlId="grade" className="col-6 mt-3">
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
                    <Form.Group controlId="button" className="col-6 mt-3">
                      <Button variant="primary" type="submit" className="mt-2">
                        Change
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

export default EditStudent;
