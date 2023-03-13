import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem
} from "cdbreact";
import { NavLink } from "react-router-dom";
import UseUser from "../hooks/UserHook";
import './NavBars.scss'

const SideNav = () => {
    
    const handleLogout = () => {
        sessionStorage.removeItem("sessionRole");
        window.location.href = '/';
    }



    const { user } = UseUser();
    console.log(user);

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>

            <CDBSidebar
                textColor="var(--secondary)"
                backgroundColor="var(--primary)"
            >
                <CDBSidebarHeader
                    prefix={
                        <i className="fa fa-bars fa-large"></i>
                    }
                >
                    <a href="/" className="text-decoration-none" style={{ color: "inherit" }}>
                        LOGO
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">

                    <CDBSidebarMenu>

                        <NavLink
                            to="/admin/dashboard"
                            activeClassName="activeClicked"
                        >
                            <CDBSidebarMenuItem
                                className="sideLinks"
                                icon="columns"
                            >
                                Dashboard
                            </CDBSidebarMenuItem>
                        </NavLink>

                        {/* School admins only */}
                        
                        {user === 'admin'
                        ?
                        <NavLink
                            to="/tables"
                            activeClassName="activeClicked"
                        >
                            <CDBSidebarMenuItem
                                className="sideLinks"
                                icon="chalkboard-teacher"
                            >
                                Teachers
                            </CDBSidebarMenuItem>
                        </NavLink>:<></>
                        }

                        {user === 'teacher' || user === 'admin'
                        ?
                        <NavLink
                            to="/profile"
                            activeClassName="activeClicked"
                        >
                            <CDBSidebarMenuItem
                                className="sideLinks"
                                icon="user-graduate"
                            >
                                Students
                            </CDBSidebarMenuItem>
                        </NavLink>:<></>
                        }
                        {/* Teacher only */}
                        {user === 'teacher'
                            ? <NavLink
                                exact
                                to="/"
                                activeClassName="activeClicked"
                            >
                                <CDBSidebarMenuItem
                                    className="sideLinks"
                                    icon="newspaper"
                                >
                                    Examinations
                                </CDBSidebarMenuItem>
                            </NavLink>

                            : <></>
                        }



                         {/* admin only */}
                         {user === 'admin'
                            ? <NavLink
                                exact
                                to="/"
                                activeClassName="activeClicked"
                            >
                                <CDBSidebarMenuItem
                                    className="sideLinks"
                                    icon="praying-hands"
                                >
                                    Requests
                                </CDBSidebarMenuItem>
                            </NavLink>

                            : <></>
                        }
                        {/* admin only */}
                        {user === 'admin'
                            ? <NavLink
                                exact
                                to="/"
                                activeClassName="activeClicked"
                            >
                                <CDBSidebarMenuItem
                                    className="sideLinks"
                                    icon="poll"
                                >
                                    Results
                                </CDBSidebarMenuItem>
                            </NavLink>

                            : <></>
                        }


                        {/* Students only */}
                        {user === 'student'
                            ? <NavLink
                                exact
                                to="/"
                                activeClassName="activeClicked"
                            >
                                <CDBSidebarMenuItem
                                    className="sideLinks"
                                    icon="file-invoice"
                                >
                                    Documents
                                </CDBSidebarMenuItem>
                            </NavLink>

                            : <></>
                        }

                        <NavLink
                            exact
                            to="/"
                            activeClassName="activeClicked"
                        >
                            <CDBSidebarMenuItem
                                className="sideLinks"
                                icon="calendar-alt"

                            >
                                Time-Tables
                            </CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink
                            exact
                            to="/"
                            activeClassName="activeClicked"
                        >
                            <CDBSidebarMenuItem
                                className="sideLinks"
                                icon="cog"
                            >
                                Options
                            </CDBSidebarMenuItem>
                        </NavLink>

                    </CDBSidebarMenu>


                </CDBSidebarContent>


                <CDBSidebarFooter>

                    <CDBSidebarMenuItem
                        className="sideLinks"
                        icon="sign-out-alt"
                    >
                    <button style={{all:"unset"}} onClick={handleLogout}>Logout</button>    
                    </CDBSidebarMenuItem>

                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );

}

export default SideNav;
