import React, { createContext, useContext, useState } from "react";
import lottieAnimation from "../assets/registeranimation.json";
import Lottie from "lottie-react";
import AuthContext from "../context/AuthContext";
// import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import auth from "../firebase/firebase.init";

function Register() {
  const [passwordError, setPasswordError] = useState("");
  const { createUser, googleLogin } = useContext(AuthContext);

  // google log in
  const handleGoogleLogin = () => {
    // console.log("logged in ");
    googleLogin()
      .then(() => {
        console.log("sucessfully loggedin ");
        toast.success("logged in successfully");
      })
      .catch((error) => console.log(error));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters and contain one uppercase, one lowercase, one number, and one special character"
      );
      return;
    }
    setPasswordError("");
    console.log(email, password);
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        form.reset();
        toast.success("logged in successfully");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("could not create new user");
      });
  };
  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left w-[40%] md:w-[60%]'>
          <Lottie animationData={lottieAnimation} loop={true} />
        </div>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <div className='card-body'>
            <h1 className='text-4xl font-bold ml-2 mt-4'>Register now!</h1>
            <form onSubmit={handleRegister} className='fieldset'>
              <label className='fieldset-label'>Email</label>
              <input
                type='email'
                name='email'
                className='input'
                placeholder='Email'
              />
              <label className='fieldset-label'>Password</label>
              <input
                type='password'
                name='password'
                className='input'
                placeholder='Password'
              />
              {passwordError && <p className='text-red-500'>{passwordError}</p>}
              <div>
                <a className='link link-hover'>Forgot password?</a>
              </div>
              <button className='btn btn-neutral mt-4'>Register</button>
            </form>
            <h1 className='head-text'>or logged in via google</h1>
            <div
              onClick={handleGoogleLogin}
              className='bg-slate-200 flex justify-center p-2 cursor-pointer hover:bg-slate-100'>
              <FaGoogle className='text-4xl ' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
