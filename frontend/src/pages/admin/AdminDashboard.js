import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { Widget } from "../../components/boxes/Widget.js";
import Charts from "../../components/boxes/Charts";
import { useContext, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import AppContext from "../../appContext";
import utils from "../../utils";
import { useNavigate } from "react-router-dom";
import BarChart from "../../components/boxes/BarChart";
import AverageClassMarkAll from "../../hooks/AverageClassMarkAll";
import AverageClassMarks from "../../hooks/AverageClassMarks";
import AverageSchoolMarks from "../../hooks/AverageSchoolMarks";
import SchoolRank from "../../hooks/SchoolRank";
import useSchool from "../../hooks/useSchool";
const AdminDashboard = () => {
  const { token, role, classe, school, profile } = useContext(AppContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  const schools = useSchool();
  const widgets = [];
  if (role === "dAdmin") {
    if (schools) {
      widgets.push({
        type: "teacher",
        value: schools.length,
        title: "School Count",
      });
    }
  }
  if (role === "sAdmin") {
    widgets.push({
      type: "teacher",
      value: school.teacherCount,
      title: "Teachers",
    });
    widgets.push({
      type: "student",
      value: school.studentCount,
      title: "Students",
    });
  }
  if (role === "teacher") {
    widgets.push({
      type: "student",
      value: classe.studentCount,
      title: "Students",
    });
    widgets.push({
      type: "teacher",
      value: classe.grade + "-" + classe.name,
      title: "Class",
    });
    widgets.push({
      type: "subject",
      value: profile.major,
      title: "Major",
    });
  }
  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />

          <div className="ps-4 pb-0 pe-3" id="bodyContainer">
            <div className="container-fluid ps-0 pe-0 pt-2">
              <div className="row">
                {widgets.map((widget, index) => (
                  <div
                    key={index}
                    className={`col-lg-${12 / widgets.length} mt-2`}
                  >
                    <Widget {...widget} />
                  </div>
                ))}
                {role === "dAdmin" ? null : (
                  <>
                    <div className="col-lg-6">
                      <Charts
                        data={
                          role === "teacher"
                            ? AverageClassMarkAll()
                            : SchoolRank()
                        }
                      />
                    </div>
                    <div className="col-lg-6">
                      <BarChart
                        data={
                          role === "teacher"
                            ? AverageClassMarks()
                            : AverageSchoolMarks()
                        }
                      />
                    </div>
                  </>
                )}
                {role === "dAdmin" ? (
                  <div className="tblArea mt-5">
                    <MDBTable align="middle" hover responsive>
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
                        {!schools || schools.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No School Admin Found
                            </td>
                          </tr>
                        ) : (
                          schools.map((School, index) => (
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
                                    <p className="fw-bold mb-1">
                                      {School.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-muted mb-0">
                                  {School.address}
                                </p>
                              </td>
                              <td>
                                <p className="text-muted mb-0">
                                  {School.studentCount}
                                </p>
                              </td>

                              <td>
                                <p className="text-muted mb-0">
                                  {School.teacherCount}
                                </p>
                              </td>
                            </tr>
                          ))
                        )}
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
