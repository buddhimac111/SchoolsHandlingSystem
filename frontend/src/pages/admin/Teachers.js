import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../appContext";
import useTeachers from "../../hooks/useTeachers";
import utils from "../../utils";
import TeacherDetailsPopup from "../../components/popups/TeacherDetailsPopup";
import axios from "axios";

const Teachers = () => {
  const { token, role } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [viewData, setViewData] = useState({});
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const event = () => {
    navigate("/admin/add-teacher");
  };
  if (role !== "sAdmin") navigate("/");
  const teachersData = useTeachers();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    setTeachers(teachersData);
  }, [token, teachersData, navigate]);
  const handlePopUp = (student) => {
    setViewData(student);
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
                <div className="col-md-10 searchContainer d-flex">
                  <SearchBar />
                </div>
                <div className="col-md-2 p-0 ps-2">
                  <MDBBtn className="w-100 text-nowrap" onClick={event}>
                    + Add Teacher
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
                    <th scope="col">Teacher ID</th>
                    <th scope="col">Name & Email</th>
                    <th scope="col">Class</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Major</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!teachers || teachers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Teachers Found
                      </td>
                    </tr>
                  ) : (
                    teachers.map((teacher, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <p className="mt-3">{index + 1}</p>
                          </td>
                          <td>
                            <p className="fw-bold mt-3">{teacher._id}</p>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={utils.URI + "/" + teacher.picture}
                                alt=""
                                style={{ width: "45px", height: "45px" }}
                                className="rounded-circle"
                              />
                              <div className="ms-3">
                                <p className="fw-bold mb-1">{teacher.name}</p>
                                <p className="text-muted mb-0">
                                  {teacher.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">{teacher.classe}</p>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">{teacher.gender}</p>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">{teacher.major}</p>
                          </td>
                          <td>
                            <p className="mt-3">{teacher.DOB.split("T")[0]}</p>
                          </td>

                          <td>
                            <div className="d-flex">
                              <FaEye
                                size={22}
                                color="black"
                                cursor="pointer"
                                onClick={() => {
                                  handlePopUp(teacher);
                                }}
                              />
                              <FaEdit
                                size={22}
                                color="black"
                                className="ms-3"
                                cursor="pointer"
                                onClick={() => {
                                  navigate(
                                    "/admin/edit-teacher/" + teacher._id
                                  );
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
                                    maxBodyLength: Infinity,
                                    url:
                                      utils.URI + "/api/users/" + teacher._id,
                                    headers: {
                                      "x-auth-token": token,
                                    },
                                  };
                                  axios
                                    .request(config)
                                    .then((res) => {
                                      const newTeachers = [...teachers];
                                      newTeachers.splice(index, 1);
                                      setTeachers(newTeachers);
                                      alert("Teacher Deleted Successfully");
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
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
      <TeacherDetailsPopup show={show} setShow={setShow} data={viewData} />
    </>
  );
};

export default Teachers;
