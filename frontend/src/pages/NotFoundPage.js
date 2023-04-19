import image from "../assets/nf.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  return (
    <>
      <div className="container404">
        <img className="w-50 rounded-5" src={image} alt="404Image" />
        <Button className="btnBack mt-3" onClick={goBack}>
          Go Back
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;
