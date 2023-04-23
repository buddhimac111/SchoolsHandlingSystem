import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { Widget } from "../../components/boxes/Widget.js";
import Charts from "../../components/boxes/Charts";
import { useContext, useEffect } from "react";
import AppContext from "../../appContext";
import { useNavigate } from "react-router-dom";
import BarChart from "../../components/boxes/BarChart";
import AverageClassMarkAll from "../../hooks/AverageClassMarkAll";
import AverageClassMarks from "../../hooks/AverageClassMarks";
import AverageSchoolMarks from "../../hooks/AverageSchoolMarks";
import SchoolRank from "../../hooks/SchoolRank";
const AdminDashboard = () => {
  const { token, role, classe, school, profile } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const widgets = [];
  if (role === "dAdmin") {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
