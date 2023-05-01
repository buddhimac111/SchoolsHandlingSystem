import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import { useState } from "react";
import Collapsible from "react-collapsible";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const Settings = () => {
  const [isExpanded1, setIsExpanded] = useState(false);

  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  console.log(currentPW, newPW, confirmPW);

  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <Collapsible
              trigger={
                <div
                  onClick={() => setIsExpanded(!isExpanded1)}
                  className="collapseHeader"
                >
                  {isExpanded1 ? <FiChevronDown /> : <FiChevronRight />}
                  Change Password
                </div>
              }
            >
              <div className="collapseBody">
                <label htmlFor="currentPW" className="lblSettings">
                  Current Password
                </label>
                <input
                  type="text"
                  className="form-control my-3 py-2 rounded-pill"
                  onChange={(e) => {
                    setCurrentPW(e.target.value);
                  }}
                />

                <label htmlFor="newPW" className="lblSettings">
                  New Password
                </label>
                <input
                  type="text"
                  className="form-control my-3 py-2 rounded-pill"
                  onChange={(e) => {
                    setNewPW(e.target.value);
                  }}
                />

                <label htmlFor="confirmPW" className="lblSettings">
                  Confirm Password
                </label>
                <input
                  type="text"
                  className="form-control my-3 py-2 rounded-pill"
                  onChange={(e) => {
                    setConfirmPW(e.target.value);
                  }}
                />

                <button className="btn btn-primary rounded-pill w-100 mt-4 mb-2">
                  Save
                </button>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
