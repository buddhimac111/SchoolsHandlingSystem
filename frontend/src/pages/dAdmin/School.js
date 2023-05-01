import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaTrash, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./dAdmin.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../appContext";
import utils from "../../utils";
import useSchool from "../../hooks/useSchool";
import SchoolDetailsPopup from "../../components/popups/SchoolDetailsPopup";
import axios from "axios";

const Schools = () => {
  const { token, role } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [viewData, setViewData] = useState({});
  const [schools, setSchools] = useState([]);
  const schoolsData = useSchool();
  const navigate = useNavigate();
  if (role !== "dAdmin") navigate("/");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    setSchools(schoolsData);
  }, [token, schoolsData, navigate]);
  const handlePopUp = (teacher) => {
    setViewData(teacher);
    setShow(true);
  };
  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid">
              <div className="row d-flex">
                <>
                  <div className="col-md-10 searchContainer d-flex">
                    <SearchBar />
                  </div>
                  <div className="col-md-2 p-0 ps-2">
                    <MDBBtn
                      className="w-100 text-nowrap"
                      onClick={() => {
                        navigate("/admin/add-school");
                      }}
                    >
                      + Add School
                    </MDBBtn>
                  </div>
                </>
              </div>
            </div>
            <div className="tblArea">
              <MDBTable align="middle" hover responsive>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">School Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Student Count</th>
                    <th scope="col">Teacher Count</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!schools || schools.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Students Found
                      </td>
                    </tr>
                  ) : (
                    schools.map((school, index) => (
                      <tr key={index}>
                        <td>
                          <p className="mt-3">{index + 1}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{school._id}</p>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={utils.URI + "/" + school.picture}
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{school.name}</p>
                              <p className="text-muted mb-0">{school.email}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{school.studentCount}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{school.teacherCount}</p>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <FaEye
                              size={22}
                              color="black"
                              cursor="pointer"
                              onClick={() => {
                                handlePopUp(school);
                              }}
                            />
                            <FaTrash
                              size={22}
                              color="black"
                              className="ms-3"
                              cursor="pointer"
                              onClick={() => {
                                let config = {
                                  method: "delete",
                                  maxBodyLength: "Infinity",
                                  url: utils.URI + "/api/schools/" + school._id,
                                  headers: {
                                    "x-auth-token": token,
                                  },
                                };
                                axios
                                  .request(config)
                                  .then((res) => {
                                    const newSchools = [...schools];
                                    newSchools.splice(index, 1);
                                    setSchools(newSchools);
                                    alert("School Deleted Successfully");
                                  })
                                  .catch((err) => {
                                    if (err.response)
                                      alert(
                                        "Error Deleting : " + err.response.data
                                      );
                                    console.log(err);
                                  });
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
      <SchoolDetailsPopup show={show} setShow={setShow} data={viewData} />
    </>
  );
};

export default Schools;
