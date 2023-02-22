import {FaUserCircle} from 'react-icons/fa';


const TopBar = () => {
    return (
        <>
        <div className="w-100" id="topBar">
            <div className='d-flex justify-content-end p-2 me-4'>
                <h4 className='pe-2' style={{color: 'white'}}>Aravinda Perera</h4>
                <FaUserCircle
                size={30}
                color="var(--secondary)"
                />
            </div>
        </div>
         
        
       
        </>

    );
}

export default TopBar;