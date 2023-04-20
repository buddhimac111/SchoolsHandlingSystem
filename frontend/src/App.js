import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from './pages/HomePage';
import UserProfile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';
import Settings from './pages/Settings';

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import Requests from "./pages/admin/Requests";
import AddStudent from "./pages/admin/AddStudent";
import AddTeacher from "./pages/admin/AddTeacher";
import ClassTimetable from "./pages/admin/Timetables";
import TimetableRenderer from "./pages/admin/TimetableRenderer";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentRequestPage from "./pages/student/StudentRequests";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherRequestPage from "./pages/teacher/TeacherRequests";
import { useEffect, useState } from "react";
import useUserData from "./hooks/useUserData";
import AppContext from "./appContext";

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
          <Route path="/settings" element={<Settings/>}/>

          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/teachers" element={<Teachers />} />
          <Route path="/admin/requests" element={<Requests />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/add-teacher" element={<AddTeacher />} />
          <Route path="/admin/timetables" element={<ClassTimetable />} />
          <Route path="/timetable/:className" element={<TimetableRenderer />} />

          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/requests" element={<TeacherRequestPage />} />

          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/requests" element={<StudentRequestPage />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
