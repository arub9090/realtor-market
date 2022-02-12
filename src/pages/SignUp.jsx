import { useState } from "react";
import { toast } from "react-toastify";
import {getAuth, createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHandler= async (e)=>{
      e.preventDefault()
      try {
          const auth= getAuth();

          const userCredential= await createUserWithEmailAndPassword(auth, email, password);
          const user= userCredential.user;
          updateProfile(auth.currentUser, {
              displayName: name
          })

          const formDataCopy = {...formData}
          delete formDataCopy.password;
          formDataCopy.timeStamp= serverTimestamp();

          await setDoc(doc(db, 'users', user.uid), formDataCopy );

          navigate('/')
      } catch (error) {
          toast.error('Bad User Credentials');
      }

  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back !</p>
      </header>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="nameInput"
          id="name"
          value={name}
          placeholder="Name"
          onChange={onChangeHandler}
        />
        <input
          type="email"
          className="emailInput"
          id="email"
          value={email}
          placeholder="Email"
          onChange={onChangeHandler}
        />

        <div className="passwordInputDiv">
          <input
            type={showpassword ? "text" : "password"}
            className="passwordInput"
            value={password}
            id="password"
            placeholder="Password"
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

        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>

      <OAuth />

      <Link to="/sign-in" className="registerSignInLink">
        Sign In Instead
      </Link>
    </div>
  );
}

export default SignUp;
