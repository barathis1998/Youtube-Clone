import React,{useState,useEffect} from 'react';
import HistoryCard from './HistoryCard'
import { BACKEND_URI } from "../Config/constants";
import NavBar from '../NavBar/NavBar';
import Homepage from '../Homepage/homepage';
import  './HistoryList.scss'

const HistoryList = () =>
{
    const [medias,setMedias] = useState([]);
    const handletoken = () =>{
        const token = localStorage.getItem("token");
       // console.log(token);
        return token;
    }
      const token = handletoken();

    useEffect(() => {
        getAllMedias();
    }, []);

    const getAllMedias = () => {
        fetch(`${BACKEND_URI}/histories/`)
          .then(response => response.json())
          .then(data => {
            setMedias(data.data.data);
          })
          .catch(error => {
            setMedias([]);
            console.log(error);
            alert("Error Happened! in UPLOAD FORM");
          });
      };
    
      console.log("medias"+JSON.stringify(medias));


     const videolib = medias ? (
      medias.length > 0 ? (
        <div className="subscription-card-container">
          {medias.map((media) => (
            <HistoryCard key={media._id} medias={media} />
          ))}
        </div>
      ) : (
        <div className="no-subscribed-videos">No Liked videos</div>
      )
    ) : (
      <div className="no-subscribed-videos">No Liked videos</div>
    );




return(
    <><NavBar /><Homepage />
    
    <div className="video-container">

      
        {videolib}
    </div>
    </>

);
    
};

export default HistoryList;