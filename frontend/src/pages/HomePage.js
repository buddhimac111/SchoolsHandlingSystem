import logo from '../assets/logo.png';
import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {
  return (
   <>
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-6 vh-100 d-flex justify-content-center align-items-center" id="loginBox">
        <div className="w-75 h-75 bg-white px-5" id='logContainer'>
          <p id="loginText">
            LOG IN
          </p>

          <div>
            <label htmlFor="Username" className="lblLog">Username</label>
            <input type="text" className="form-control my-3 py-2 rounded-pill"/>
          </div>

          <div>
            <label htmlFor="Password" className="lblLog">Password</label>
            <input type="password" className="form-control my-3 py-2  rounded-pill"/>
          </div>

          <div>
          <a href="/" className="text-decoration-none d-flex justify-content-end" id="forgotPassword">Forgot Password?</a>
          </div>

          <button id="btnLogin" type="button" className="btn btn-sm p-2 w-100 rounded-pill weight ">LOG IN</button>

        </div>
      </div>
      <div className="col-lg-6 vh-100 " id="contentBox">
      <Carousel controls={false}>
      <Carousel.Item>
        <div className='d-flex align-items-center justify-content-center' id='logoBlock'>
         <img
          className="d-block w-50"
          src={logo}
          alt="First slide"
        /> 
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className='d-flex align-items-center justify-content-center' id='descBlock'>
        <p>Small description and Contact information</p>
        </div>
      </Carousel.Item>
    </Carousel>
     
      </div>
    </div>
  </div>
  </>

  );
}

export default HomePage;


