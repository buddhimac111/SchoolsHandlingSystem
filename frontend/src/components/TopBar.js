import { CDBNavbar} from "cdbreact";
import {FaUserCircle} from 'react-icons/fa';

const TopBar = () => {
    return (
        <>
         <div className="topContainer">
          <CDBNavbar expand="md" scrolling className="justify-content-end pe-3">
            <div className="ml-auto">
            <h5 className="d-inline-flex pe-2">Aravinda Perera</h5>
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