import { CDBNavbar} from "cdbreact";
import {FaUserCircle} from 'react-icons/fa';
import './Comp.css'

const TopBar = () => {
    return (
        <>
         <div className="topContainer">
          <CDBNavbar expand="md" scrolling className="justify-content-end pe-3">
            <div className="ml-auto">
            <p className="d-inline-flex pe-2 fs-6 fw-bold">username</p>
            <FaUserCircle
                size={25}
                />
  
            </div>
          </CDBNavbar>
        </div>
         
        
       
        </>

    );
}

export default TopBar;