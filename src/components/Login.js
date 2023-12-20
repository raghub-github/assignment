import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { toast } from "react-toastify";

const host = process.env.REACT_APP_HOSTNAME;

const Login = () => {
  const { getData } = useCartContext();
  const { getUser } = useUserContext();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      await getData();
      await getUser();
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error(`${json.error ? json.error : "Error"}`);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ "padding": "4rem 0 4rem 0", "textAlign": "center" }}>
      <h2 className="textStyle" >Login to continue</h2>
      <div className="container" style={{ "marginTop": "5rem", "paddingTop": "50px", "paddingLeft": "50px", "paddingRight": "50px", "boxSizing": "border-box", "borderRadius": "10px", "paddingBottom": "50px", "backgroundColor": "rgb(227 245 255 / 28%)" }}>
        <form
          onSubmit={handleSubmit}
          className="formStyle"
        >
          <input
            type="email"
            value={credentials.email}
            name="email"
            id="email"
            placeholder="ENTER EMAIL ADDRESS"
            aria-describedby="emailHelp"
            style={{ textTransform: "none", "width": "100%" }}
            onChange={onChange}
          />
          <input
            type="password"
            value={credentials.password}
            name="password"
            id="password"
            style={{ textTransform: "none", "width": "100%" }}
            onChange={onChange}
            placeholder="ENTER YOUR PASSWORD"
            required
          />
          <input className="contactInputs" type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
};

export default Login;
