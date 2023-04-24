import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import useStudents from "../../hooks/useStudents";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../appContext";
import utils from "../../utils";
import StudentDetailsPopup from "../../components/StudentDetailsPopup";

const Timetable = () => {
  const { token, role } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [viewData, setViewData] = useState({});
  const navigate = useNavigate();
  if (role === "dAdmin") navigate("/");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  const students = useStudents();
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
                {role === "sAdmin" ? (
                  <>
                    <div className="col-md-10 searchContainer d-flex">
                      <SearchBar />
                    </div>
                    <div className="col-md-2 p-0 ps-2">
                      <MDBBtn
                        className="w-100 text-nowrap"
                        onClick={() => {
                          navigate("/admin/add-student");
                        }}
                      >
                        + Add Student
                      </MDBBtn>
                    </div>
                  </>
                ) : (
                  <div className="col-md-12 searchContainer d-flex">
                    <SearchBar />
                  </div>
                )}
              </div>
            </div>
            <div className="tblArea">
              <MDBTable align="middle" hover responsive>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">piriod</th>
                    <th scope="col">Monday</th>
                    <th scope="col">Tuesday</th>
                    <th scope="col">Wednsday</th>
                    <th scope="col">Thuesday</th>
                    <th scope="col">Friday</th>
                    
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!students || students.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Students Found
                      </td>
                    </tr>
                  ) : (
                    students.map((student, index) => (
                      <tr key={index}>
                        <td>01</td>
                        <td>
                          <p className="mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">
                            <select name="cars" id="cars">
                                <option value="volvo">Maths</option>
                                <option value="saab">English</option>
                                <option value="mercedes">Sinhala</option>
                                <option value="audi">History</option>
                            </select>
                          </p>
                        </td>
                        
                        
                        
                        <td>
                          <div className="d-flex justify-content-center">
                            <FaEye
                              size={22}
                              color="black"
                              cursor="pointer"
                              onClick={() => {
                                handlePopUp(student);
                              }}
                            />
                            {role === "sAdmin" ? (
                              <>
                                <FaEdit
                                  size={22}
                                  color="black"
                                  className="ms-3"
                                />
                                <FaTrash
                                  size={22}
                                  color="black"
                                  className="ms-3"
                                />
                              </>
                            ) : null}
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
      <StudentDetailsPopup show={show} setShow={setShow} data={viewData} />
    </>
  );
};

export default Timetable;
