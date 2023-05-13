import React, { useState,useEffect } from 'react'
import Homepage from '../Homepage/homepage';
import NavBar from '../NavBar/NavBar';
import VideoCard from '../VideoCard/VideoCard';
import VideoList from '../VideoList/VideoList';

function MainHomePage() {
  const [searchValue, setSearchValue] = useState("");

   const handletoken = () =>{
        // const token = JSON.stringify(JSON.parse(localStorage.getItem("token")));
        const token = localStorage.getItem("token");
        console.log(token);
    }
    const handleName=() => {
      const name = localStorage.getItem("name");
        console.log(name);
    }
    handleName();
    
    useEffect(() => {
       handletoken();
    }, []);

  

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
        <Homepage />
      <NavBar onSearch={handleSearch}/>

      <VideoList searchValue={searchValue} />
      {/* <VideoCard /> */}
   

    </div>
      
  )
}

export default MainHomePage