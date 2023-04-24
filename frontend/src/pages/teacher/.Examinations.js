import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import './teacher.css';

const Examinations = () => {

    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        let config = {
            method: "POST",
            maxBodyLength: "Infinity",
            url: "http://localhost:3000/api/upload",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formData,
        }
        axios.request(config).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });

      
    };




    return (
        <>
            <div className="d-flex">
                <SideNav />
                <div className="w-100">
                    <TopBar />

                    <div className="ps-4 pt-4">

                        <input type="file" name="file" onChange={handleFileUpload} />
                        <button type="submit" onClick={handleSubmit}>Upload</button>





                    </div>


                </div>
            </div>
        </>
    );
};

export default Examinations;