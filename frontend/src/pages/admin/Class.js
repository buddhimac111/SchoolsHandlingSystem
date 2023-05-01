import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import {
  FaTrash,
  FaEdit,
  FaCalendarCheck,
  FaCalendarAlt,
} from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import GetClasses from "../../hooks/getClasses";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../appContext";
import utils from "../../utils";
import axios from "axios";
import TimetablePopup from "../../components/popups/TimetablePopup";

const Classes = () => {
  const { token, role } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [viewData, setViewData] = useState({});
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  if (role === "dAdmin" || role === "teacher") navigate("/");
  const classData = GetClasses();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    setClasses(classData);
  }, [token, classData, navigate]);
  function TimetableView(classe) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/timetables/" + classe,
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        response.data._id = classe;
        setViewData(response.data);
        setShow(true);
      })
      .catch((error) => {
        if (error.response.status === 404)
          return navigate("/admin/add-timetable/" + classe);
        console.log(error);
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
              <div className="row d-flex">
                <div className="col-md-10 searchContainer d-flex">
                  <SearchBar />
                </div>
                <div className="col-md-2 p-0 ps-2">
                  <MDBBtn
                    className="w-100 text-nowrap"
                    onClick={() => {
                      navigate("/admin/add-classes");
                    }}
                  >
                    + Add Class
                  </MDBBtn>
                </div>
              </div>
            </div>
            <div className="tblArea">
              <MDBTable
                style={{ textAlign: "center" }}
                align="middle"
                hover
                responsive
              >
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Class ID</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Year</th>
                    <th scope="col">StudentCount</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!classes || classes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Students Found
                      </td>
                    </tr>
                  ) : (
                    classes.map((classe, index) => (
                      <tr key={index}>
                        <td>
                          <p className="mt-3">{index + 1}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{classe._id}</p>
                        </td>

                        <td>
                          <p className="mt-3">{`${classe.grade}-${classe.name}`}</p>
                        </td>
                        <td>
                          <p className="mt-3">{classe.year}</p>
                        </td>
                        <td>
                          <p className="mt-3">{classe.studentCount}</p>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <FaEdit
                              title="Edit Class"
                              size={22}
                              color="black"
                              className="ms-3"
                              cursor="pointer"
                              onClick={() => {
                                navigate("/admin/edit-class/" + classe._id);
                              }}
                            />
                            <FaTrash
                              title="Delete Class"
                              size={22}
                              color="black"
                              className="ms-3"
                              cursor="pointer"
                              onClick={() => {
                                let config = {
                                  method: "DELETE",
                                  maxBodyLength: Infinity,
                                  url: utils.URI + "/api/classes/" + classe._id,
                                  headers: {
                                    "x-auth-token": token,
                                  },
                                };
                                axios
                                  .request(config)
                                  .then((res) => {
                                    const newClasses = [...classes];
                                    newClasses.splice(index, 1);
                                    setClasses(newClasses);
                                    alert("Class Deleted Successfully");
                                  })
                                  .catch((err) => {
                                    if (err.response)
                                      alert(
                                        "Error Deleting: " + err.response.data
                                      );
                                    console.log(err);
                                  });
                              }}
                            />
                            <FaCalendarAlt
                              title="View Timetable"
                              size={22}
                              color="black"
                              className="ms-3"
                              cursor="pointer"
                              onClick={() => {
                                TimetableView(classe._id);
                              }}
                            />
                            <FaCalendarCheck
                              title="Edit Timetable"
                              size={22}
                              color="black"
                              className="ms-3"
                              cursor="pointer"
                              onClick={() => {
                                navigate("/admin/edit-timetable/" + classe._id);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
      <TimetablePopup setShow={setShow} show={show} data={viewData} />
    </>
  );
};

export default Classes;
