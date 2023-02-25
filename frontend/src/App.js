import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
   <BrowserRouter>
    <div className="App"> 
      <Routes>
        < Route path="/" element= {<HomePage/>}/>
        < Route path="/admin" element= {<AdminDashboard/>}/>       
      </Routes> 
    </div>
   </BrowserRouter>
  );
}

export default App;
