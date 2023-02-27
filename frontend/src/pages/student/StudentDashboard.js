import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import prof from "../../assets/tstProf.jpeg";
import school from "../../assets/school.png";
import './student.css'

const StudentDashboard = () => {


  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <p className="fs-6 fw-bold pt-2 ps-3 mb-0">Dashboard</p>

          <div className="container-fluid ps-4 pt-2 pb-3 pe-3" id="bodyContainer">

            <div className="row">
              <div className="col-lg-6  ps-0 pt-0"> {/* light color */}
             
                <div className="pt-4" id="profileBox">
                  <center><img id="profileImage" className="rounded-circle" src={prof} alt="ProfileImage" /></center>

                  <p id="nameText" className="text-center pt-2 mb-0">Hirunika Premachandra</p>

                  <div class="mt-2 d-flex align-items-center justify-content-center">
                    <div class="px-2 py-1 text-white shadow rounded-2" id="roleTag">Student</div>
                  </div>

                  <div class="mt-2 d-flex align-items-center justify-content-center">
                    <div class="px-2 py-1" id="idTag">ID - #235487</div>
                  </div>

                  <div className="ps-4 pe-4">

                    <hr />
                    <div className="d-flex align-items-center justify-content-center">
                      <img id="schoolImage" className="rounded-circle" src={school} alt="schoolImage" />
                      <p className="pt-4 ps-3" id="schoolTag">St. Joseph's College / Colombo 10</p>
                    </div>
                    <hr />
                    <div className="d-flex ms-2">

                      <div className="d-block me-5">
                      <p className="infoHeader mb-0">Grade & Class</p>
                      <p className="infoBody">13 - M2</p>
                      </div>
                      <div className="d-block ms-5">
                      <p className="infoHeader mb-0">Class Teacher</p>
                      <p className="infoBody">Mrs. Chanrani Kasthuriarachchi</p>
                      </div>
                    
                    </div>

                    <div className="d-flex ms-2">

                      <div className="d-block me-5">
                      <p className="infoHeader mb-0">Entered Date</p>
                      <p className="infoBody">2003/05/12</p>
                      </div>
                      <div className="d-block ms-5">
                      <p className="infoHeader mb-0">Birthdate</p>
                      <p className="infoBody">1997/05/78</p>
                      </div>
                    
                    </div>
                    <div className="d-flex ms-2">

                      <div className="d-block me-5">
                      <p className="infoHeader mb-0">Contact</p>
                      <p className="infoBody mb-0">0717845120</p>
                      </div>
                      <div className="d-block ms-5">
                      <p className="infoHeader mb-0">Guardian</p>
                      <p className="infoBody mb-0">Unkonwn Premachandra</p>
                      </div>
                    
                    </div>
                   <hr/>
                    <div className="d-flex ms-2">

                      <div className="d-block me-5">
                      <p className="infoHeader mb-0">Postal Address</p>
                      <p className="infoBody">No.25 , new place , Unknown Street , Colombo 02</p>
                      </div>
                    
                    
                    </div>
                     

                  </div>

                </div>

              </div>

              <div className="col-lg-6">{/* light yello */}
                

              </div>

            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;