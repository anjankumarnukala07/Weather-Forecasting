
import React,{useState} from 'react';
import {useForm} from 'react-hook-form';

import './Loginsignup.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
function Loginsignup() {
  const { register, handleSubmit,formState:{errors} } = useForm();
  const [formType, setFormType] = useState('login');
  const [err2,seterr2]=useState("")
  const navigate=useNavigate()
  const onSubmit = (data) => {
    console.log(data);
  };
  let handlesignup=()=>{
    navigate('/Signup')
  }
  const loginUser=(usercredobj)=>{
    axios.post("http://localhost:3500/user-api/user-login",usercredobj)
    .then((response)=>{
      if(response.data.message==="Success")
      {
        navigate('/Home')
        console.log("user succesfully login")
      }
      else{
        console.log("user login failed")
        seterr2(response.data.message)
      }
    })
    .catch((err)=>{
      seterr2(err.message)
      console.log("error in user login",err)
    })
  }
  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center vh-100">
        <div className="col-md-5">
          <div className="card ">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            {err2.length!==0 &&(
              <p className="display-3 text-center text-danger">{err2}</p>
            )}
            <div className="card-body">
              <form onSubmit={handleSubmit(loginUser)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
                  />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              
            <div className="card-footer">
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handlesignup}
                >
                  Sign Up
                </button>
              </p>
              </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Loginsignup;