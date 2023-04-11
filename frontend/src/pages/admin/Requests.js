import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import SearchBar from "../../components/SearchBar";
import './admin.css';

const Requests = () => {
 
    return (
        <>
            <div className="d-flex">
                <SideNav />
                <div className="w-100">
                    <TopBar />
                    <div className="ms-2 mb-0 me-2 mt-3">
                        
                    </div>


                </div>
            </div>
        </>
    );
};

export default Requests;