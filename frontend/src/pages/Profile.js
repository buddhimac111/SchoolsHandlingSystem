import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import { FaIdCard, FaAt, FaEdit } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../utils";
import AppContext from "../appContext";
const UserProfile = () => {
  const { classe, user, profile, school, role, token } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

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
                  <img
                    className="rounded-circle profileImage"
                    src={`${utils.URI}/${user.picture}`}
                    alt="schoolImage"
                  />
                </div>
                <div className="col-lg-10 mt-2 pt-3 nameSection">
                  <h2>{user.name}</h2>
                  <div className="d-flex">
                    <FaIdCard size={22} /> <p className="ps-2">#{user.id}</p>
                  </div>
                  <div className="d-flex">
                    <FaAt size={22} /> <p className="ps-2">{user.email}</p>
                  </div>
                  <div className="text-center px-2 py-1 text-white shadow rounded-2 roleTag">
                    {user.role}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row m-0 p-0">
                {/* School Details */}
                {role === "dAdmin" ? null : (
                  <div className="col-lg-4 schoolBox d-flex pt-3 pb-3">
                    <img
                      className="rounded-circle schoolImage"
                      src={`${utils.URI}/${school.picture}`}
                      alt="schoolImage"
                    />
                    <div className="schoolTexts">
                      <h4 className="pt-2 pe-5">{school.name}</h4>
                      <h5>{school.address}</h5>
                      {role === "sAdmin" ? (
                        <>
                          <h6>Student Count : {school.studentCount}</h6>
                          <h6>Teacher Count : {school.teacherCount}</h6>
                          <FaEdit
                            size={22}
                            color="white"
                            className="ms-3"
                            cursor="pointer"
                            onClick={() => {
                              navigate("/admin/edit-school/");
                            }}
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
                <div className="col classBox pt-4 ps-4">
                  <h4>Full Name :</h4>
                  <p className="fw-bold">{user.name}</p>
                  <hr />

                  <h4>Address :</h4>
                  <p className="fw-bold">{profile.address}</p>
                  <hr />

                  <h4>DOB :</h4>
                  <p className="fw-bold">
                    {new Date(profile.dob)
                      .toLocaleString("en-US", {
                        year: "numeric",
                        day: "2-digit",
                        month: "2-digit",
                      })
                      .split("/")
                      .reverse()
                      .join("-")}
                  </p>
                  <hr />

                  <h4>Class :</h4>
                  <p className="fw-bold">{`Grade : ${classe.grade}-${classe.name}`}</p>
                  <p className="fw-bold">{`Year : ${classe.year}`}</p>
                  <p className="fw-bold">{`Student Count : ${classe.studentCount}`}</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
