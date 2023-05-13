import React from "react";
import { useState, useEffect } from "react";
import Homepage from "../Homepage/homepage";
import NavBar from "../NavBar/NavBar";
import styles from "./styles.module.scss";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const handleName = () => {
    const name = localStorage.getItem("name");
    return name;
  };
  const name = handleName();
  console.log("name mail id " + name);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:9002/users/${name}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        console.log("result is: ", JSON.stringify(result, null, 4));
        setUserDetails(result);
      }
      //   setUserDetails(result);
      console.log("user details response " + userDetails);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Homepage />
      <NavBar onSearch={handleSearch} />
      <div className={styles.userDetails}>
        <label className={styles.labelStyle}>FIRSTNAME</label>
        <input
          type="text"
          placeholder={userDetails.firstName}
          name="firstName"
          className={styles.input}
          readOnly
        />
        <label className={styles.labelStyle}>LASTNAME</label>
        <input
          type="text"
          placeholder={userDetails.lastName}
          name="lastName"
          className={styles.input}
          readOnly
        />
        <label className={styles.labelStyle}>EMAIL</label>
        <input
          type="email"
          placeholder={userDetails.email}
          name="email"
          className={styles.input}
          readOnly
        />
      </div>
    </div>
  );
};

export default UserProfile;
