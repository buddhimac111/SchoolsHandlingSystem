import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";

const Students = () => {
  const event = () => {
    window.location.href = "/admin/add-student";
  };

  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid">
              <div class="row d-flex">
                <div class="col-md-10 searchContainer d-flex">
                  <SearchBar />
                </div>
                <div className="col-md-2 p-0 ps-2">
                  <MDBBtn className="w-100 text-nowrap" onClick={event}>
                    + Add Student
                  </MDBBtn>
                </div>
              </div>
            </div>
            <div className="tblArea">
              <MDBTable align="middle" hover responsive>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Student ID</th>
                    <th scope="col">Name & Email</th>
                    <th scope="col">Class & Teacher</th>
                    <th scope="col">Section</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>
                      <p className="mt-3">1</p>
                    </td>
                    <td>
                      <p className="fw-bold mt-3">641578</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">John Doe</p>
                          <p className="text-muted mb-0">john.doe@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">13 - M2</p>
                      <p className="text-muted mb-0">Mrs. G M C K Gunasekara</p>
                    </td>
                    <td>
                      <h6>
                        <MDBBadge
                          color="success"
                          className="py-2 mt-3 w-75 text-center"
                        >
                          Advanced
                        </MDBBadge>
                      </h6>
                    </td>

                    <td>
                      <div className="d-flex">
                        <FaEye size={22} color="black" />
                        <FaEdit size={22} color="black" className="ms-3" />
                        <FaTrash size={22} color="black" className="ms-3" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p className="mt-3">2</p>
                    </td>
                    <td>
                      <p className="fw-bold mt-3">641578</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">John Doe</p>
                          <p className="text-muted mb-0">john.doe@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">13 - M2</p>
                      <p className="text-muted mb-0">Mrs. G M C K Gunasekara</p>
                    </td>
                    <td>
                      <h6>
                        <MDBBadge
                          color="success"
                          className="py-2 mt-3 w-75 text-center"
                        >
                          Advanced
                        </MDBBadge>
                      </h6>
                    </td>

                    <td>
                      <div className="d-flex">
                        <FaEye size={22} color="black" />
                        <FaEdit size={22} color="black" className="ms-3" />
                        <FaTrash size={22} color="black" className="ms-3" />
                      </div>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </div>
            {/* <div className="container-fluid ps-0 pe-0 pt-2">
                                   <div className="row">
                                        <div className="col-lg-3 mt-2">
                                             <Widget type="student" />
                                        </div>
                                        <div className="col-lg-3 mt-2">
                                             <Widget type="teacher" />
                                        </div>
                                        <div className="col-lg-3 mt-2">
                                             <Widget type="subject" />
                                        </div>
                                        <div className="col-lg-3 mt-2">
                                             <Widget type="rank" />
                                        </div>
                                        <div className="col-lg-4 mt-2">
                                             <DoughnutChart/>
                                        </div>
                                        <div className="col-lg-8">
                                             <Charts />
                                        </div>
                                   </div>
                              
                              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
