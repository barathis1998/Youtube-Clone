
import React,{useState,useEffect} from 'react';
import {FaBars, FaTimes,IconContext} from 'react-icons/fa';
//import {AiOutlineSetting,AiTwotoneFire,AiOutlineFire, AiFillBank} from 'react-icons/ai';
//import { BsHandThumbsUpFill,BsPostcardHeartFill,BsArrowCounterclockwise } from "react-icons/bs";
import './homepage.scss'
//import Container from 'react-bootstrap/esm/Container';

import { GoSignOut } from "react-icons/go";

import {
  AiOutlineSetting,
  AiTwotoneFire,
  AiOutlineFire,
  AiFillBank,
} from "react-icons/ai";
import {
  BsHandThumbsUpFill,
  BsPostcardHeartFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import "./homepage.scss";
import Container from "react-bootstrap/esm/Container";

const Homepage = () => {
  // const handletoken = () => {
  //   // const token = JSON.stringify(JSON.parse(localStorage.getItem("token")));
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  // };
  // handletoken();

  const [show, setShow] = useState(true);

  // function btnpress(e) {
  //     e.preventDefault();
  // setShow(!show);
  //     // further processing happens here
  //  }


    const handletoken = () =>{
        // const token = JSON.stringify(JSON.parse(localStorage.getItem("token")));
        const token = localStorage.getItem("token");
        console.log(token);
    }
       handletoken();
    


    // const [show,setShow]=useState(true);
    
    // function btnpress(e) {
    //     e.preventDefault();
    // setShow(!show);
    //     // further processing happens here
    //  }

    return(
        <div className="fn1">
        <button className="menubar btn-menu"><FaBars size={25} color='grey'/></button>
        {
          show &&
          (
            <div class="navbarLeft">
              <button className="menubar" onClick={() => window.location.href = 'http://localhost:3000/home'}><AiFillBank /> Home</button>
              {/* <button className="menubar" onClick={() => window.location.href='http://localhost:3000/trending'}><AiTwotoneFire /> Trending</button> */}
              <button className="menubar" onClick={() => window.location.href = 'http://localhost:3000/liked'}><BsHandThumbsUpFill /> Liked Video</button>
              <button className="menubar" onClick={() => window.location.href = 'http://localhost:3000/subscriptions'}><BsPostcardHeartFill /> Subscription</button>
              <button className="menubar" onClick={() => window.location.href = 'http://localhost:3000/histories'}><BsArrowCounterclockwise /> History</button>
              <button className="menubar" onClick={() => window.location.href = 'http://localhost:3000/login'}><GoSignOut/> Log Out</button>

            </div>

          )
        }
      </div>  
    )
   

}


export default Homepage;
