import React from "react";
import { Link } from "react-router-dom";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";

function ClassTimetable() {
  return (
    <div>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid mt-5">
              <div className="row">
                <h2>Time Tables</h2>
                <div>
                  <h3>Grades</h3>
                  <ul>
                    <li>
                      <Link to="/timetable/class1">Grade 1</Link>
                    </li>
                    <li>
                      <Link to="/timetable/grade2A">Grade 2</Link>
                    </li>
                    <li>
                      <Link to="/timetable/3">Grade 3</Link>
                    </li>
                    <li>
                      <Link to="/timetable/4">Grade 4</Link>
                    </li>
                    <li>
                      <Link to="/timetable/5">Grade 5</Link>
                    </li>
                    <li>
                      <Link to="/timetable/6">Grade 6</Link>
                    </li>
                    <li>
                      <Link to="/timetable/7">Grade 7</Link>
                    </li>
                    <li>
                      <Link to="/timetable/8">Grade 8</Link>
                    </li>
                    <li>
                      <Link to="/timetable/9">Grade 9</Link>
                    </li>
                    <li>
                      <Link to="/timetable/10">Grade 10</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassTimetable;
