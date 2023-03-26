import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UserProfile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import Students from './pages/admin/Students';

import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          < Route path="/" element={<HomePage />} />
          < Route path="*" element={<NotFoundPage />} />
          < Route path="/profile" element={<UserProfile />} />

          < Route path="/admin/dashboard" element={<AdminDashboard />} />
          < Route path="/admin/students" element={<Students />} />

          < Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          < Route path="/student/dashboard" element={<StudentDashboard />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
