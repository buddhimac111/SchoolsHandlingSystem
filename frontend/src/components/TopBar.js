import { CDBNavbar } from "cdbreact";
import { Link } from "react-router-dom";
import "./NavBars.scss";
import utils from "../utils";
import { useContext } from "react";
import AppContext from "../appContext";

const TopBar = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <div className="topContainer">
        <CDBNavbar expand="md" scrolling className="justify-content-end pe-3">
          <div className="ml-auto">
            <Link to="/profile" style={{ all: "unset", cursor: "pointer" }}>
              <p className="d-inline-flex pe-2 fs-6 fw-bold">{user.name}</p>
              {user.picture ? (
                <img
                  src={`${utils.URI}/${user.picture}`}
                  className="rounded-circle"
                  alt="User Avatar"
                  width={25}
                  height={25}
                />
              ) : null}
            </Link>
          </div>
        </CDBNavbar>
      </div>
    </>
  );
};

export default TopBar;
