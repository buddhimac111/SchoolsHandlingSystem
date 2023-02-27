import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
   <BrowserRouter>
    <div className="App"> 
      <Routes>
        < Route path="/" element= {<HomePage/>}/>
        < Route path="/admin/dashboard" element= {<AdminDashboard/>}/>  
        < Route path="/teacher/dashboard" element= {<TeacherDashboard/>}/> 
        < Route path="/student/dashboard" element= {<StudentDashboard/>}/>   
        < Route path="*" element= {<NotFoundPage/>}/>

      </Routes> 
    </div>
   </BrowserRouter>
  );
}

export default App;
