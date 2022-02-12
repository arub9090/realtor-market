import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function Signin() {
  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHandler= async (e)=>{
        e.preventDefault();
        try {
            const auth= getAuth();

            const userCredential= await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                
                navigate('/profile');
            }

        } catch (error) {
            toast.error('Wrong User Credentials');
        }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back !</p>
      </header>

      <form onSubmit={onSubmitHandler}>
        <input
          type="email"
          className="emailInput"
          id="email"
          value={email}
          onChange={onChangeHandler}
        />

        <div className="passwordInputDiv">
          <input
            type={showpassword ? "text" : "password"}
            className="passwordInput"
            value={password}
            id="password"
            onChange={onChangeHandler}
          />
          <img
            src={visibilityIcon}
            alt="show Password"
            className="showPassword"
            onClick={() => setShowpassword((prevState) => !prevState)}
          />
        </div>

        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot Password
        </Link>

        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>

      <OAuth />

      <Link to="/sign-up" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  );
}

export default Signin;
