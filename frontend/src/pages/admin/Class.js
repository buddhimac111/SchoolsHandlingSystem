import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import GetClasses from "../../hooks/getClasses";
import { useContext, useEffect } from "react";
import AppContext from "../../appContext";

const Classes = () => {
  const { token, role } = useContext(AppContext);
  const navigate = useNavigate();
  if (role === "dAdmin" || role === "teacher") navigate("/");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  const classes = GetClasses();
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
              <MDBTable align="middle" hover responsive>
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
                            <FaEye size={22} color="black" />
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
    </>
  );
};

export default Classes;
