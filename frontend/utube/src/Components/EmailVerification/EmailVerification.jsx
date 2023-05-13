import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URI } from "../Config/constants";
import './EmailVerification.scss'

const EmailVerification = () => {
  const { id, token } = useParams();
  const [validToken, setValidToken] = useState(false);
    console.log("inside email");
  function verifyEmail(id, token) {
    console.log("inside verifyEmail");
    const idAndToken = {
      id: id,
      token: token,
    };
    axios
      .post(`${BACKEND_URI}/users/verifyEmailToken`, idAndToken)
      .then((response) => {
        const responseStatus = response.data.message;
        if (responseStatus === "user verified") {
          setValidToken(true);
        }
        console.log("Verification successful:", response.data);
      })
      .catch((error) => {
        console.error("Verification failed:", error.response.data);
      });
  }

  useEffect(() => {
    verifyEmail(id, token);
  }, []);

  return (
    <div className="email-verification-container">
      {validToken ? (
        <div className="success-message">
          Email has been verified, you can now{" "}
          <a href="http://localhost:3000/login">login</a>
        </div>
      ) : (
        <div className="error-message">
          Could not verify email, token is wrong.
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
