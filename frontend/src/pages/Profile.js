import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import Prof from "../assets/proff.png";
import { FaIdCard, FaAt } from "react-icons/fa";

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

            </div>


          </div>



        </div>
      </div>
    </>
  );
};

export default userProfile;