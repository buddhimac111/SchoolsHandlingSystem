import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import SearchBar from "../../components/SearchBar";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../../appContext";
import useSubjects from "../../hooks/useSubjects";

const Timetable = () => {
  const { token, role } = useContext(AppContext);
  const navigate = useNavigate();
  if (role === "dAdmin") navigate("/");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  const subjects = useSubjects();
  const dates = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
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
                  {periods.map((period) => {
                    return (
                      <tr>
                        <td>{period}</td>
                        {dates.map((date) => {
                          return (
                            <td>
                              <p className="fw-bold mt-3">
                                <select name="cars" id="cars">
                                  {subjects.map((subject) => (
                                    <option value="volvo">{subject}</option>
                                  ))}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
