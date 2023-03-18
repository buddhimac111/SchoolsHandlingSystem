import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import Prof from "../assets/proff.png";
import School from "../assets/school.png";
import { FaIdCard, FaAt, FaUsers } from "react-icons/fa";

const userProfile = () => {


  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />

          <div className="ps-5 pb-0 pe-3 pt-2" id="bodyArea">

            <div className="container-fluid ps-0 pe-0 pt-2">
              <div className="row">
                <div className="col-2 mt-2 profileBox">
                  <img className="rounded-circle profileImage" src={Prof} alt="schoolImage" />
                </div>
                <div className="col-lg-10 mt-2 pt-3 nameSection">
                  <h2 >Denister Andrew Samarakoon</h2>
                  <div className="d-flex">
                    <FaIdCard
                      size={22}
                    /> <p className="ps-2">#52468</p>
                  </div>
                  <div className="d-flex">
                    <FaAt
                      size={22}
                    /> <p className="ps-2">das52468@stannes.scl.lk</p>
                  </div>
                  <div class="text-center px-2 py-1 text-white shadow rounded-2 roleTag">Scl. Admin</div>
                </div>
              </div>
              <hr />
              <div className="row m-0 p-0">

                  <div className="col-lg-4 schoolBox d-flex pt-3 pb-3">
                    <img className="rounded-circle schoolImage" src={School} alt="schoolImage" />
                    <div className="schoolTexts">
                    <h4 className="pt-2 pe-5">St.Anne's College</h4>
                    <h5>Kurunegala</h5>
                    </div>
                    
                  
                  </div>
                  <div className="col classBox pt-4 ps-4">
                    <h4>Full Name :</h4>
                    <p className="fw-bold">Don Denister Andrew Samarakoon de Silva</p>
                    <hr/>

                    <h4>Address :</h4>
                    <p className="fw-bold">No.45, Mihidu-Mawatha, Dambulla-road, Kurunegala</p>
                    <hr/>

                    <h4>Started Year :</h4>
                    <p className="fw-bold">2007</p>
                    <hr/>
                    <h4>Started Year :</h4>
                    <p className="fw-bold">2007</p>
                    <hr/>
                  {/* <FaUsers className="pt-4"
                      size={75}
                      color={"var(--secondary)"}
                    /> 
                    <div className="schoolTexts">
                    <h4 className="pt-4 pe-4">Grade 13-M2</h4>
                    </div> */}
                  
                  </div>

                 
                  

              </div>

             


            </div>


          </div>



        </div>
      </div>
    </>
  );
};

export default userProfile;