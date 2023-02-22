import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";

const AdminDashboard = () => {

    
  return (
    <>
    <div className="d-flex">
    <SideNav/>
    <div className="w-100">
    <TopBar/>

    <div className="ps-4 pt-4">

    <h1>Hello</h1>
    <h2>This is School Admin Dashboard</h2>
    
    </div>


    </div>
    </div>
    </>
  );
};

export default AdminDashboard;