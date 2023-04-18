import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import HomePage from './pages/HomePage';
import UserProfile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';
import Options from './pages/Options';
=======
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
>>>>>>> 6d2da83717d92e385452d5ecf1b6242ad0cebbac

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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          < Route path="/" element={<HomePage />} />
          < Route path="*" element={<NotFoundPage />} />
          < Route path="/options" element={<Options />} />
          < Route path="/profile" element={<UserProfile />} />


          < Route path="/dashboard" element={<AdminDashboard />} />
          < Route path="/admin/students" element={<Students />} />
          < Route path="/admin/teachers" element={<Teachers />} />
          < Route path="/admin/requests" element={<Requests />} />

          < Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          < Route path="/student/dashboard" element={<StudentDashboard />} />
=======
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<UserProfile />} />

          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/teachers" element={<Teachers />} />
          <Route path="/admin/requests" element={<Requests />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/add-teacher" element={<AddTeacher />} />
          <Route path="/admin/timetables" element={<ClassTimetable />} />
          <Route path="/timetable/:className" element={<TimetableRenderer />} />
>>>>>>> 6d2da83717d92e385452d5ecf1b6242ad0cebbac

          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/requests" element={<TeacherRequestPage />} />

          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/requests" element={<StudentRequestPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
