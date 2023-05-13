import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlayCircle, AiOutlineUpload } from "react-icons/ai";
import Container from "react-bootstrap/esm/Container";
import "./NavBar.scss";
import Navbar from "react-bootstrap/esm/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {ReactComponent as Svg} from '../../img/Morph & Color Animations.svg'

const NavBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const navigateUser = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  const handleName = () => {
    const name = localStorage.getItem("name");
    // console.log(name);
    return name;
  };


  const firstLetter = handleName()?.charAt(0).toUpperCase();

  const handletoken = () => {
    const token = localStorage.getItem("token");
    //console.log(token);
  };
  handletoken();

  return (
    <>

      <a href="http://localhost:3000/home">{/* <Svg className="logo" /> */}</a>
      <div className="search-bar">
        <Navbar bg="light" expand="lg">
          <i className="fab fa-youtube fa-lg youtube-icon"></i>
          <Container>
            <form onSubmit={handleSubmit}>
              <input
                className="search-field"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button className="search-btn" type="submit">
                Search
              </button>
              <button
                className="menu-btn"
                onClick={() => {
                  navigate("/upload");
                }}
              >
                <AiOutlineUpload size={30} />
              </button>
              <button
                className="user-account-button"
                onClick={() => {
                  navigateUser("/userDetails");
                }}
              >
                {firstLetter}
              </button>
            </form>
          </Container>
        </Navbar>
      </div>
    </>

  );
};

export default NavBar;
