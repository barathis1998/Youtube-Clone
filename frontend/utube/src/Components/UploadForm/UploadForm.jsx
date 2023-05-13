import React,{useState,useEffect} from 'react';
// import styles from './UploadForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UploadForm.scss';
import UploadVideoForm from '../Form/UploadVideoForm';  
import UploadList from '../Form/UploadList';
import axios from 'axios';
import { BACKEND_URI } from '../Config/constants';

const UploadForm = () => {

    const [medias,setMedias] = useState([]);

    useEffect(() => {
        getAllMedias();
    }, [])
    
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQ5ZDY2MjM3ODlhYjY0ZWE2M2ZhNyIsImlhdCI6MTY4MTYxNjQ5Nn0.1b0TVmOKlapiIuApPa4Xy76siWjkQyq1qjmdLbvcxfw";
    const handletoken = () =>{
        const token = localStorage.getItem("token");
        console.log(token);
        return token;
    }
       const token=handletoken();
    
   
    
    const getAllMedias = () => {
        fetch(`${BACKEND_URI}/videos/videoByUser`,{
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then(response => response.json())
          .then(data => {
            setMedias(data.data);
            console.log("Chceking whether it's fetching");
            console.log(medias);
          })
          .catch(error => {
            setMedias([]);
            console.log(error);
            alert("Error Happened! in UPLOAD FORM");
          });
      };

    //   const getAllMedias = () => {
    //     fetch(`${BACKEND_URI}/videos/`)
    //       .then(response => response.json())
    //       .then(data => {
    //         setMedias(data.data.data);
    //       })
    //       .catch(error => {
    //         setMedias([]);
    //         console.log(error);
    //         alert("Error Happened! in UPLOAD FORM");
    //       });
    //   };

    console.log(medias);

    return(
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body"><UploadVideoForm getAllMedias={getAllMedias}/></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                    <div className="card-body"><UploadList medias={medias} /></div>
                    </div>
                </div>

            </div>  
            </>
    )
}


export default UploadForm;