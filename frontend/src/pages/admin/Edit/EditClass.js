import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SideNav from "../../../components/SideNav";
import TopBar from "../../../components/TopBar";
import axios from "axios";
import AppContext from "../../../appContext";
import utils from "../../../utils";
import "../admin.css";

const EditClass = () => {
  const { id } = useParams();
  const { token, role } = useContext(AppContext);

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "sAdmin") navigate("/");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/classes/" + id,
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then((res) => {
        setName(res.data.name);
        setGrade(res.data.grade);
        setYear(res.data.year);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, role, navigate, id]);
  function handleClassSubmit(event) {
    event.preventDefault();
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/classes/" + id,
      headers: {
        "x-auth-token": token,
      },
      data: {
        name,
        grade,
        year,
      },
    };
    axios
      .request(config)
      .then((res) => {
        alert("Class edited successfully");
        navigate(-1);
      })
      .catch((err) => {
        if (err.response) alert("Error editing class : " + err.response.data);
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
                <Form onSubmit={handleClassSubmit}>
                  <div className="row">
                    <Form.Group controlId="sname" className="col-6 mt-3">
                      <Form.Label>Grade</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter school name"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="name" className="col-6 mt-3">
                      <Form.Label>Class Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter class name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="year" className="col-6 mt-3">
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="button" className="col-6 mt-3">
                      <Button variant="primary" type="submit" className="mt-2">
                        Edit
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

export default EditClass;
