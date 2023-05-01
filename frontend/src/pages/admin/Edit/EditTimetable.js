import SideNav from "../../../components/SideNav";
import TopBar from "../../../components/TopBar";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "../admin.css";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../appContext";
import useSubjects from "../../../hooks/useSubjects";
import { Button, Form } from "react-bootstrap";
import utils from "../../../utils";
import axios from "axios";

const EditTimetable = () => {
  const { id } = useParams();
  const { classId } = useParams();
  const { token, role } = useContext(AppContext);
  const [timetable, setTimetable] = useState({});
  const navigate = useNavigate();
  if (role === "dAdmin") navigate("/");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/timetables/" + id,
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then((res) => {
        setTimetable(res.data);
      })
      .catch((err) => {
        navigate("/admin/add-timetable/" + id);
        console.log(err);
      });
  }, [token, navigate]);
  const subjects = useSubjects();
  const dates = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      _id: classId,
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };
    for (let [key, value] of formData.entries()) {
      data[key.split("-")[0]].push(value);
    }
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/timetables/" + id,
      headers: {
        "x-auth-token": token,
      },
      data,
    };
    axios
      .request(config)
      .then((res) => {
        alert("succefully Edited");
        navigate("/admin/classes");
      })
      .catch((err) => {
        if (err.response) alert(err.response.data);
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
            <div className="tblArea">
              <Form onSubmit={submitForm}>
                <MDBTable
                  style={{ textAlign: "center" }}
                  align="middle"
                  hover
                  responsive
                >
                  <MDBTableHead dark>
                    <tr>
                      <th scope="col">Period</th>
                      <th scope="col">Monday</th>
                      <th scope="col">Tuesday</th>
                      <th scope="col">Wednesday</th>
                      <th scope="col">Thuesday</th>
                      <th scope="col">Friday</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {periods.map((period) => {
                      return (
                        <tr key={"p" + period}>
                          <td>{period}</td>
                          {dates.map((date) => {
                            return (
                              <td key={"d" + date}>
                                <p className="fw-bold mt-3">
                                  <select name={`${date}-${period}`} required>
                                    <option value="">Select</option>
                                    {subjects.map((subject) => {
                                      if (
                                        timetable[date][period - 1] === subject
                                      ) {
                                        return (
                                          <option
                                            key={subject}
                                            value={subject}
                                            selected
                                          >
                                            {subject}
                                          </option>
                                        );
                                      }
                                      return (
                                        <option key={subject} value={subject}>
                                          {subject}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </p>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </MDBTableBody>
                </MDBTable>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTimetable;
