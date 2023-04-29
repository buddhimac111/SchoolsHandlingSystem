import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../appContext";
import utils from "../../utils";
import useSAdmin from "../../hooks/useSAdmin";
import SAdminDetailsPopup from "../../components/popups/SAdminDetailsPopup";

const SAdmin = () => {
  const { token, role } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [viewData, setViewData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (role !== "dAdmin") navigate("/");
    if (!token) {
      navigate("/");
    }
  }, [token, role, navigate]);
  const SAdmin = useSAdmin();
  const handlePopUp = (SAdmin) => {
    setViewData(SAdmin);
    setShow(true);
  };
  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid">
              <div className="row d-flex">
                <div className="col-md-9 searchContainer d-flex">
                  <SearchBar />
                </div>
                <div className="col-md-3 p-0 ps-2">
                  <MDBBtn
                    className="w-100 text-nowrap"
                    onClick={() => {
                      navigate("/admin/add-sadmin");
                    }}
                  >
                    + Add School Admin
                  </MDBBtn>
                </div>
              </div>
            </div>
            <div className="tblArea">
              <MDBTable align="middle" hover responsive>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!SAdmin || SAdmin.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No School Admin Found
                      </td>
                    </tr>
                  ) : (
                    SAdmin.map((sAdmin, index) => (
                      <tr key={index}>
                        <td>
                          <p className="mt-3">{index + 1}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{sAdmin._id}</p>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={utils.URI + "/" + sAdmin.picture}
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{sAdmin.name}</p>
                              <p className="text-muted mb-0">{sAdmin.school}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{sAdmin.email}</p>
                        </td>
                        <td>
                          <p className="fw-bold mt-3">{sAdmin.gender}</p>
                        </td>

                        <td>
                          <p className="mt-3">{sAdmin.DOB.split("T")[0]}</p>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <FaEye
                              size={22}
                              color="black"
                              cursor="pointer"
                              onClick={() => {
                                handlePopUp(sAdmin);
                              }}
                            />
                            {role === "sAdmin" ? (
                              <>
                                <FaEdit
                                  size={22}
                                  color="black"
                                  className="ms-3"
                                />
                                <FaTrash
                                  size={22}
                                  color="black"
                                  className="ms-3"
                                />
                              </>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
      <SAdminDetailsPopup show={show} setShow={setShow} data={viewData} />
    </>
  );
};

export default SAdmin;
