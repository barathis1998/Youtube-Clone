import React, { useState, useEffect } from 'react';
import './VideoList.scss';
import { BACKEND_URI } from '../Config/constants';
import VideoCard from '../VideoCard/VideoCard';

const VideoList = ({ searchValue }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  //console.log(searchValue);

  const handletoken = () => {
    const token = localStorage.getItem('token');
    //console.log(token);
    return token;
  };

  const token = handletoken();

  const getAllMedias = () => {
    fetch(`${BACKEND_URI}/videos/`)
      .then((response) => response.json())
      .then((data) => {
        setMedias(data.data.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert('Error Happened! in UPLOAD FORM');
      });
  };

  const filteredMedias = searchValue
  ? medias.filter((media) =>
      media.title && media.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  : medias;

  console.log("filtered"+filteredMedias);
  const videoLib =
    filteredMedias.length > 0 ? (
      filteredMedias.map((media) => (
        <VideoCard key={media._id} medias={media} />
      ))
    ) : (
      <p>No videos found</p>
    );

  return <div className="video-container">{videoLib}</div>;
};

export default VideoList;
