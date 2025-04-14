import React, { useContext } from "react";
import lottieAnimation from "../assets/registeranimation.json";
import Lottie from "lottie-react";
import AuthContext from "../context/AuthContext";

function Register() {
  const [passwordError, setPasswordError] = React.useState("");
  const { createUser } = useContext(AuthContext);

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
              <button className='btn btn-neutral mt-4'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
