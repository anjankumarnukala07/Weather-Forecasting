import React,{useState} from 'react';
import {useForm} from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup() {
  const { register, handleSubmit,formState:{errors} } = useForm();
  const [formType, setFormType] = useState('login');
  const [err1,seterr1]=useState(" ")
  const navigate=useNavigate()
  //const onclick = (data) => {
    //navigate(-1)
  //};
  let addNewUser=(newuser)=>{
        axios.post("http://localhost:3500/user-api/user-signup",newuser)
        .then((response)=>{
          if(response.statusText==="OK"){
            navigate(-1)
          }
          console.log(response)
          if(response.status!==201){
                seterr1(response.data.message)
                console.log(response.data.message)
          }
        })
        .catch((err)=>{
          if(err.response){
            seterr1(err.message)
          }
          else if(err.request){
            seterr1(err.message)
          }
          else{
            seterr1(err.message)
          }
        })
  }
  return (
    <div className="container ">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5">
          <div className="card ">
            <div className="card-header">
              <h3>SignUp</h3>
            </div>
            {err1.length!==0 &&(
            <p className='display-3 text-center text-danger'>{err1}</p>
            )} 
            <div className="card-body">
              <form onSubmit={handleSubmit(addNewUser)}>
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
                <button type="submit" className="btn btn-primary" >
                  Signup
                </button>
              
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Signup;