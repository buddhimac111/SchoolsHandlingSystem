import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "./NavBars.scss";
import AppContext from "../appContext";
import { useContext } from "react";
const SideNav = () => {
  const { role } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("sessionRole");
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        background: "",
      }}
    >
      <CDBSidebar textColor="var(--secondary)" backgroundColor="var(--primary)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link
            className="text-decoration-none"
            to="/dashboard"
            style={{ color: "inherit" }}
          >
            <img src="/edu.png" alt="logo" width={50} height={50} />
            <sup className="text-info">
              {role === "dAdmin"
                ? "Divisional Admin"
                : role === "sAdmin"
                ? "School Admin"
                : role === "teacher"
                ? "Teacher"
                : "restrict"}
            </sup>
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/dashboard" activeclassname="activeClicked">
              <CDBSidebarMenuItem className="sideLinks" icon="columns">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            {/* divisional admins only */}
            {role === "dAdmin" ? (
              <NavLink to="/admin/schools" activeclassname="activeClicked">
                <CDBSidebarMenuItem className="sideLinks" icon="school">
                  Schools
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <></>
            )}
            {role === "dAdmin" ? (
              <NavLink
                to="/admin/schoolsadmins"
                activeclassname="activeClicked"
              >
                <CDBSidebarMenuItem className="sideLinks" icon="user-lock">
                  School Admins
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <></>
            )}
            {role === "dAdmin" ? (
              <NavLink to="/admin/subjects" activeclassname="activeClicked">
                <CDBSidebarMenuItem className="sideLinks" icon="book">
                  Subjects
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <></>
            )}
            {/* School admins only */}
            {role === "sAdmin" ? (
              <NavLink to="/admin/teachers" activeclassname="activeClicked">
                <CDBSidebarMenuItem
                  className="sideLinks"
                  icon="chalkboard-teacher"
                >
                  Teachers
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <></>
            )}
            {role === "sAdmin" ? (
              <NavLink
                exact="true"
                to="/admin/classes"
                activeclassname="activeClicked"
              >
                <CDBSidebarMenuItem className="sideLinks" icon="chalkboard">
                  Classes
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <></>
            )}

            {role === "teacher" || role === "sAdmin" ? (
              <NavLink to="/admin/students" activeclassname="activeClicked">
                <CDBSidebarMenuItem className="sideLinks" icon="user-graduate">
                  Students
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <></>
            )}

            {/* Teacher only */}
            {role === "teacher" ? (
              <NavLink
                exact="true"
                to="/teacher/examinations"
                activeclassname="activeClicked"
              >
                <CDBSidebarMenuItem className="sideLinks" icon="newspaper">
                  Examinations
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <></>
            )}

            <NavLink
              exact="true"
              to="/settings"
              activeclassname="activeClicked"
            >
              <CDBSidebarMenuItem className="sideLinks" icon="cog">
                Settings
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <CDBSidebarMenuItem className="sideLinks" icon="sign-out-alt">
            <button style={{ all: "unset" }} onClick={handleLogout}>
              Logout
            </button>
          </CDBSidebarMenuItem>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideNav;
