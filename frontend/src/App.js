import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import UserProfile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import Settings from "./pages/Settings";

import Schools from "./pages/dAdmin/School";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import AddStudent from "./pages/admin/Add/AddStudent";
import AddTeacher from "./pages/admin/Add/AddTeacher";
import AddTimetable from "./pages/admin/Add/AddTimetable";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentRequestPage from "./pages/student/StudentRequests";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherRequestPage from "./pages/teacher/TeacherRequests";
import Examinations from "./pages/teacher/Examinations";

import { useEffect, useState } from "react";
import useUserData from "./hooks/useUserData";
import AppContext from "./appContext";
import SAdmin from "./pages/admin/Sadmin";
import Classes from "./pages/admin/Class";
import AddClasses from "./pages/admin/Add/AddClass";
import AddSAdmin from "./pages/admin/Add/AddSAdmin";
import Subjects from "./pages/admin/Subjects";
import AddSubject from "./pages/admin/Add/AddSubject";
import EditTeacher from "./pages/admin/Edit/EditTeacher";
import EditClass from "./pages/admin/Edit/EditClass";
import EditTimetable from "./pages/admin/Edit/EditTimetable";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setRole(sessionStorage.getItem("sessionRole"));
    setToken(sessionStorage.getItem("auth-token"));
  }, [navigate, role, token]);
  const { user, school, classe, profile } = useUserData(token, role, navigate);
  const appContextValue = {
    token,
    role,
    user,
    school,
    classe,
    profile,
  };
  return (
    <div className="App">
      <AppContext.Provider value={appContextValue}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin/schools" element={<Schools />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/schoolsadmins" element={<SAdmin />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/teachers" element={<Teachers />} />
          <Route path="/admin/classes" element={<Classes />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/add-teacher" element={<AddTeacher />} />
          <Route path="/admin/add-classes" element={<AddClasses />} />
          <Route
            path="/admin/add-timetable/:classId"
            element={<AddTimetable />}
          />
          <Route path="/admin/add-sadmin" element={<AddSAdmin />} />
          <Route path="/admin/add-subject" element={<AddSubject />} />
          <Route path="/admin/subjects" element={<Subjects />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/requests" element={<TeacherRequestPage />} />
          <Route path="/teacher/examinations" element={<Examinations />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/requests" element={<StudentRequestPage />} />
          <Route path="/admin/edit-teacher/:id" element={<EditTeacher />} />
          <Route path="/admin/edit-class/:id" element={<EditClass />} />
          <Route path="/admin/edit-timetable/:id" element={<EditTimetable />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
