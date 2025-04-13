import React from "react";
import lottieAnimation from "../assets/registeranimation.json";
import Lottie from "lottie-react";

function Register() {
  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <Lottie animationData={lottieAnimation} loop={true} />
        </div>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <div className='card-body'>
            <h1 className='text-4xl font-bold ml-2 mt-4'>Login now!</h1>
            <fieldset className='fieldset'>
              <label className='fieldset-label'>Email</label>
              <input type='email' className='input' placeholder='Email' />
              <label className='fieldset-label'>Password</label>
              <input type='password' className='input' placeholder='Password' />
              <div>
                <a className='link link-hover'>Forgot password?</a>
              </div>
              <button className='btn btn-neutral mt-4'>Login</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
