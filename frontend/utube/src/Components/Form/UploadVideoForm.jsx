import React, { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URI } from "../Config/constants";
import './UploadVideoForm.scss';

const UploadVideoForm = ({getAllMedias}) => {

    const [name,setName] = useState('');
    const [videos,setVideos] = useState([]);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [tnail,setTnail] = useState("");
    const [vid,setVid] = useState("");

   
    let tdata = new FormData();
    //let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQ5ZDY2MjM3ODlhYjY0ZWE2M2ZhNyIsImlhdCI6MTY4MTYxNjQ5Nn0.1b0TVmOKlapiIuApPa4Xy76siWjkQyq1qjmdLbvcxfw";
    const handletoken = () =>{
      const token = localStorage.getItem("token");
     // console.log(token);
      return token;
  }
    const token = handletoken();
  

  const uploadThumbnail = ()=>{
    console.log("entetred uploadthumbnail function");
    console.log(vid);
    tdata.append("image", image);
    tdata.append("description",description);
    console.log(tdata);
    axios.put(`${BACKEND_URI}/videos/${vid}/thumbnail`,tdata)
    .then((response) => {
      console.log(response);
      // handle successful response here
    })
    .catch((error) => {
      console.error(error);
      // handle error here
    });
  }

  useEffect(() => {
    if (vid) {
        console.log("Thumbnail upload started...");
        uploadThumbnail();
    }
}, [vid]);


    const handleSubmit = (e) =>{
        e.preventDefault();
        let formdata = new FormData();
        for (let key in videos)
        {
            formdata.append("video",videos[key]);
        }
        formdata.append("name", name);
        
       
        axios.post(`${BACKEND_URI}/videos`,formdata,{
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }).then(response => {setVid(response.data.video);
            console.log("Response function");
            console.log(response.data.video);
            console.log("Obtained op");
            console.log(vid);
            uploadThumbnail();})
        .catch((error) => {console.log(error);
            alert('Error Happend! in UPLOAD VIDEO FORM PAGE' );
        });
        alert("Submitted Successfully");
        
        window.location.reload();
    };

    return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" placeholder="Name of the video" name="name" id="name" className="form-control" onChange={(e) => setName(e.target.value)} />
            </div>    
    
            <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
       

        <div className="form-group">
          <label  htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            name="description"
            id="description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

    <div className="form-group">
        <label htmlFor="Videos">Upload Videos</label>
        <input type="file" name="videos" id="videos" multiple className="form-control" accept=".mp4, .mkv" onChange={(e) => {setVideos(e.target.files)} } />
    </div>
    <button type="Submit" className="btn btn-primary mt-2">Submit</button>
    </form>
    
        </>
        );

};

export default UploadVideoForm;