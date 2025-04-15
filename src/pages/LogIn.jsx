import React, { useContext } from "react";
import Lottie from "lottie-react";
import lottieAnimation from "../assets/registeranimation.json";
import AuthContext from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

function LogIn() {
  const { signinUser, googleLogin } = useContext(AuthContext);

  // google log in
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        console.log("sucessfully loggedin ");
        toast.success("logged in successfully");
      })
      .catch((error) => console.log(error));
  };

  // sign in user
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signinUser(email, password)
      .then((result) => {
        console.log("user came from auth", result.user.email);
        form.reset();
        toast.success("logged in successfully");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("password or id mismatched");
        form.reset();
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
            <h1 className='text-4xl font-bold ml-2 mt-4'>Login now!</h1>
            <form onSubmit={handleSignIn} className='fieldset'>
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

              <div>
                <a className='link link-hover'>Forgot password?</a>
              </div>
              <button className='btn btn-neutral mt-4'>Login</button>
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

export default LogIn;
