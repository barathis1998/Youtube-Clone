import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("inside method");
      const url = "http://localhost:9002/users/login";
      const obj = await axios.post(url, data);
      console.log("after call" + JSON.stringify(obj.data.data));
      // console.log("data inside frontend " + res);
      localStorage.setItem("token", obj.data.data);

      //console.log(localStorage.setItem("token", res.data));
      // window.location = "/";
      if (obj.data.message === "successful") {
        console.log("login successful");
        localStorage.setItem("name", data.email);
        console.log(data.email);

        navigate("/home");

      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        //alert("failed");
        setError("UserName/Password incorrect or User not Verified");
      }
      console.log(error);
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              onClick={handleSubmit}
              type="submit"
              className={styles.green_btn}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
