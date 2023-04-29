import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaTrash, FaEye } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import "./admin.css";

const Requests = () => {
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
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Sort by</option>
                    <option value="1">Role</option>
                    <option value="2">Request Type</option>
                    <option value="3">Grade</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="tblArea">
              <MDBTable align="middle" hover responsive>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Request Type</th>
                    <th scope="col">Name & ID</th>
                    <th scope="col">Role</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>
                      <p className="mt-3">1</p>
                    </td>
                    <td>
                      <p className="fw-bold mt-3">Get Certificate</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">John Doe</p>
                          <p className="text-muted mb-0">#641578</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Student</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">13-M2</p>
                    </td>

                    <td>
                      <div className="d-flex">
                        <FaEye size={22} color="black" />
                        <FaTrash size={22} color="black" className="ms-3" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p className="mt-3">2</p>
                    </td>
                    <td>
                      <p className="fw-bold mt-3">Get Certificate</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">John Doe</p>
                          <p className="text-muted mb-0">#641578</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Student</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">13-M2</p>
                    </td>

                    <td>
                      <div className="d-flex">
                        <FaEye size={22} color="black" />
                        <FaTrash size={22} color="black" className="ms-3" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mt-3">3</p>
                    </td>
                    <td>
                      <p className="fw-bold mt-3">Change Credentials</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">Jane de Silva</p>
                          <p className="text-muted mb-0">#641578</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Teacher</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">10-M2</p>
                    </td>

                    <td>
                      <div className="d-flex">
                        <FaEye size={22} color="black" />
                        <FaTrash size={22} color="black" className="ms-3" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mt-3">4</p>
                    </td>
                    <td>
                      <p className="fw-bold mt-3">Change Credentials</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">max young</p>
                          <p className="text-muted mb-0">#641578</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Student</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">10-M2</p>
                    </td>

                    <td>
                      <div className="d-flex">
                        <FaEye size={22} color="black" />
                        <FaTrash size={22} color="black" className="ms-3" />
                      </div>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
