import React from "react";
import { BACKEND_URI } from "../Config/constants";
import './SubscriptionCard.scss';
import axios from "axios";

const SubscriptionCard =  ({medias})=> {
    
    console.log("Entered ");
    console.log(medias._id);
    console.log(medias);
   // console.log(medias.videoId.views);
   const handletoken = () =>{
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
}
  const token = handletoken();

  const handleView = () => {
    console.log("Inside handle view");
      axios
        .put(`${BACKEND_URI}/videos/${medias._id}/views`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const handleHistory = () => {
    console.log("Inside History view");
    const data = { videoId: medias._id, type: "watch" };
    axios
      .post(`${BACKEND_URI}/histories`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  


    return (
        <a href={`http://localhost:3000/video/${medias._id}`} onClick={(e) => {handleView(); handleHistory(); }}>
            <div className="video-card">
                <div className="thumbnail-container">
                <img className="thumbnail" src={`${BACKEND_URI}/public/videos/${medias.thumbNailUrl}`}/>
                    <video className="video-preview" src={`${BACKEND_URI}/public/videos/${medias.url}`} preload="metadata"></video>
                </div>
                <div className="info">
                    {/* <h4 className="title">{medias.videoId.title}</h4>
                    <p className="description">{medias.videoId.description}</p>
                    
                    <p className="views">{medias.videoId.views} views</p> */}
                    
                    <p className="title">{medias.title}</p>
                    <p className="channel-name">{medias.userId.firstName} {medias.userId.lastName}</p>
                    <p className="views">{medias.views} Views</p>
                </div>
            </div>
        </a>
    )
}

export default SubscriptionCard;

// {/* <div className="video">
// {/* {medias && medias.map((media) => { */}
//     {/* return ( */}
//     <div className="content">
//     <img className="thumbnail" src={`${BACKEND_URI}/public/videos/${medias.thumbNailUrl}`} ></img>
//     <div className="info">
//         <h4 className="title">{medias.views} <br></br>{medias.userId.firstName}</h4>
//     </div>
// </div>
//     {/* ) */}
// {/* })} */}

// </div> */}