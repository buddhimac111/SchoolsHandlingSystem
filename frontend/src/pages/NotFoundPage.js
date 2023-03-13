import image from '../assets/nf.jpg';
import { Button } from 'react-bootstrap';

const NotFoundPage = () => {

function goBack() {
  window.history.back();
}
  return (
    
    <>
   <div className="container404">
   <img
          className="w-50 rounded-5"
          src={image}
          alt="404Image"
        /> 
  <Button className='btnBack mt-3' onClick={goBack}>Go Back</Button>
  </div>
 
  
    </>
  );
};

export default NotFoundPage;