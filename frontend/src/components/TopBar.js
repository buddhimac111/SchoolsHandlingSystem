import { CDBNavbar } from "cdbreact";
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavBars.scss'

const TopBar = () => {
  return (
    <>

      <div className="topContainer">
        <CDBNavbar expand="md" scrolling className="justify-content-end pe-3">
          <div className="ml-auto">
            <Link to="/profile" style={{ all: 'unset', cursor: 'pointer' }}>
              <p className="d-inline-flex pe-2 fs-6 fw-bold">username</p>
              <FaUserCircle
                size={25}
              />
            </Link>
          </div>

        </CDBNavbar>
      </div>



    </>

  );
}

export default TopBar;