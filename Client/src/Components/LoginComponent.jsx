import React, { useState } from "react";
import "../Css/login.css";
import avatar from "../Images/avatar.svg";
import axios from "axios";
import {
  EnvelopeFill,
  LockFill,
  Google,
  Linkedin,
  Facebook,
  EyeSlashFill,
  EyeFill,
} from "react-bootstrap-icons";
import { useHistory } from "react-router";

function LoginComponent() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const[error,setError] = useState("");
  const[showPwd,setVisibility] = useState(false);

  let history = useHistory();

  const emailHandler = (event) => {
    setUserData({
      ...userData,
      email: event.target.value,
    });
  };

  const passwordHandler = (event) => {
    setUserData({
      ...userData,
      password: event.target.value,
    });
  };

  const toggleVisibility = ()=>{
    showPwd?setVisibility(false):setVisibility(true);
    
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    axios
      .post("/login", userData)
      .then(({data}) => {
        if(data === "success"){
          history.push('/');
        }
        else{
          setError(data.message);
        }
      })
      .catch((err) => { 
        console.log(err);
      });
  };
  return (
    <div className="form-container text-center m-auto">
      <div className="title my-3">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="error-msg">
        {error}
      </div>
      <div className="input-container">
        <form className="d-flex flex-column align-items-center">
          <div className="form-group my-2">
            <div className="input-icon">
              <span>
                <EnvelopeFill />
              </span>
            </div>
            <div className="input-control">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={emailHandler}
              ></input>
            </div>
          </div>
          <div className="form-group my-2">
            <div className="input-icon">
              <span>
                <LockFill />
              </span>
            </div>
            <div className="input-control">
              <input
                type={showPwd?"text":"password"}
                name="password"
                id="password"
                placeholder="password"
                onChange={passwordHandler}
              ></input>
            </div>
            <div className="eye-icon">
              <span onClick={toggleVisibility}>
                {showPwd?<EyeFill/>:<EyeSlashFill/>}
              </span>
            </div>
          </div>
          <div className="forget-password">
            <a href="/register">Forget password?</a>
          </div>
          <div className="submit-btn my-2">
            <button type="button" className="text-white" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="sign-up">
            <span>
              Don't have an account?<a href="/register">&nbsp;Sign up</a>
            </span>
          </div>
          <div className="social-login d-flex">
            <div className="google-icon">
              <Google className="mx-3" />
            </div>
            <div className="linkedin-icon">
              <Linkedin className="mx-3" />
            </div>
            <div className="facebook-icon">
              <Facebook className="mx-3" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
