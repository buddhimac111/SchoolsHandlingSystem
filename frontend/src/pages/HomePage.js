import logo from "../assets/logo.png";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../utils";
import axios from "axios";
import AppContext from "../appContext";
const HomePage = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) return navigate("/dashboard");
  }, [navigate, token]);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [LoginError, setLoginError] = useState("");

  const login = async () => {
    let data = JSON.stringify({
      email: Username,
      password: Password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${utils.URI}/api/auth`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setLoginError("");
        sessionStorage.setItem(
          "auth-token",
          response.headers.get("x-auth-token")
        );
        sessionStorage.setItem("sessionRole", response.data.role);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response) setLoginError(error.response.data);
        else setLoginError(error.message);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-lg-6 vh-100 d-flex justify-content-center align-items-center"
            id="loginBox"
          >
            <div className="w-75 h-75 bg-white px-5" id="logContainer">
              <p id="loginText">LOG IN</p>

              {LoginError ? (
                <div className="alert alert-danger p-1 mb-2 text-center">
                  {LoginError}
                </div>
              ) : (
                <></>
              )}

              <form>
                <div>
                  <label htmlFor="Username" className="lblLog">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control my-3 py-2 rounded-pill"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="Password" className="lblLog">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control my-3 py-2  rounded-pill"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                {/* <div>
                  <a
                    href="/"
                    className="text-decoration-none d-flex justify-content-end"
                    id="forgotPassword"
                  >
                    Forgot Password?
                  </a>
                </div> */}

                <button
                  id="btnLogin"
                  type="button"
                  className="btn btn-sm p-2 w-100 rounded-pill weight "
                  onClick={login}
                >
                  LOG IN
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 vh-100 " id="contentBox">
            <Carousel controls={false}>
              <Carousel.Item>
                <div
                  className="d-flex align-items-center justify-content-center"
                  id="logoBlock"
                >
                  <img className="d-block w-50" src={logo} alt="First slide" />
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div
                  className="d-flex align-items-center justify-content-center"
                  id="descBlock"
                >
                  <p>Small description and Contact information</p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
