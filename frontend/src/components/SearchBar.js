import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
  
      <>
      <InputGroup className="mb-3 p-0">
        <Form.Control
          placeholder="Search Students"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button id="button-addon2">
            <FaSearch/>
        </Button>
      </InputGroup>
     
    
      </>
  );
}

export default SearchBar;