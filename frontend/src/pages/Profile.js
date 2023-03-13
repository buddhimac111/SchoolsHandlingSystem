import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";

const userProfile = () => {

    
  return (
    <>
    <div className="d-flex">
    <SideNav/>
    <div className="w-100">
    <TopBar/>

    <div className="ps-4 pt-4">

    <h1>Hello</h1>
    <h2>This profile Dashboard</h2>
    
    </div>


    </div>
    </div>
    </>
  );
};

export default userProfile;