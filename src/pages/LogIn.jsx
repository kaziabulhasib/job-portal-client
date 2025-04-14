import React, { useContext } from "react";
import Lottie from "lottie-react";
import lottieAnimation from "../assets/registeranimation.json";
import AuthContext from "../context/AuthContext";

function LogIn() {
  const { signinUser } = useContext(AuthContext);
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signinUser(email, password)
      .then((result) => {
        console.log("user came from auth", result.user);
        form.reset();
      })
      .catch((error) => console.log(error.message));
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
