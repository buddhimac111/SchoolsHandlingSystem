import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import useSchool from "../../hooks/useStudents";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../appContext";
import utils from "../../utils";
import StudentDetailsPopup from "../../components/StudentDetailsPopup";

const School = () => {
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
  const School = useSchool();
  const handlePopUp = (School) => {
    setViewData(School);
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
                        + Add School
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
              <MDBTable
                style={{ textAlign: "center" }}
                align="middle"
                hover
                responsive
              >
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">School ID</th>
                    <th scope="col">School Name</th>
                    <th scope="col">School Address</th>
                    <th scope="col">Students Count</th>
                    <th scope="col">Teachers Count</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!School || School.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No School Admin Found
                      </td>
                    </tr>
                  ) : (
                    School.map((School, index) => (
                      <tr key={index}>
                        <td>
                          <p className="mt-3">{index + 1}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{School._id}</p>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={utils.URI + "/" + School.picture}
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{School.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-muted mb-0">{School.email}</p>
                        </td>
                        <td>
                          <p className="text-muted mb-0">{School.address}</p>
                        </td>
                        <td>
                          <p className="text-muted mb-0">
                            {School.StudentCount}
                          </p>
                        </td>

                        <td>
                          <p className="text-muted mb-0">
                            {School.TeacherCount}
                          </p>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <FaEye
                              size={22}
                              color="black"
                              cursor="pointer"
                              onClick={() => {
                                handlePopUp(School);
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

export default School;
