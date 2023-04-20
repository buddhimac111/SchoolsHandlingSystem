import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import RequestPage from "../../components/RequestPage";

const TeacherRequestPage = () => {
  return (
    <>
      <div className="d-flex">
        <SideNav />
        <div className="w-100">
          <TopBar />
          <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
            <div className="container-fluid mt-5">
              <RequestPage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherRequestPage;
