import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";

function TimetableRenderer() {
  const { className } = useParams();
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/timetable/${className}`)
      .then((response) => setTimetable(response.data))
      .catch((error) => console.log(error));
  }, [className]);

  return (
    <div>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid mt-5">
              <div className="row">
                <h2>Time Table for {className}</h2>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr className="table-dark">
                      <th>Time</th>
                      <th>Monday</th>
                      <th>Tuesday</th>
                      <th>Wednesday</th>
                      <th>Thursday</th>
                      <th>Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable &&
                      timetable.map((row, index) => (
                        <tr key={index}>
                          <td>{row.time}</td>
                          <td>{row.monday}</td>
                          <td>{row.tuesday}</td>
                          <td>{row.wednesday}</td>
                          <td>{row.thursday}</td>
                          <td>{row.friday}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimetableRenderer;
