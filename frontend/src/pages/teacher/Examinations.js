import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../../appContext";
import useExams from "../../hooks/useExams";

const Subjects = () => {
  const { token, role } = useContext(AppContext);
  const navigate = useNavigate();
  if (role !== "teacher") navigate("/");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  const exams = useExams();
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
                      navigate("/admin/add-subject");
                    }}
                  >
                    + Add Exams
                  </MDBBtn>
                </div>
              </div>
            </div>
            <div className="tblArea">
              <MDBTable
                align="middle"
                style={{ textAlign: "center" }}
                hover
                responsive
              >
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID </th>
                    <th scope="col">Name </th>
                    <th scope="col">Semester </th>
                    {!exams || exams.length === 0
                      ? null
                      : exams[0].results.map((result) => {
                          return <th scope="col">{result.subject}</th>;
                        })}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!exams || exams.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Exams Found
                      </td>
                    </tr>
                  ) : (
                    exams.map((exam, index) => (
                      <tr key={index}>
                        <td>
                          <p className="mt-3">{index + 1}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{exam.student}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{exam.name}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{exam.semester}</p>
                        </td>
                        {exam.results.map((result) => {
                          return (
                            <td>
                              <p className="fw-bold mt-3">{result.marks}</p>
                            </td>
                          );
                        })}
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

export default Subjects;
