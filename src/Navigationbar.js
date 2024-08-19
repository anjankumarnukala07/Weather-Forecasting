import React from 'react'
import './Home1.css';
import { useContext,useState } from 'react';
import { cityContext } from './context1';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import img1 from './images/img1.jpg';
function Navigationbar() {
    let {realweather}=useContext(cityContext);
    let {register,handleSubmit}=useForm();
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                    <div className="container-fluid mt-2">
                        <img className='image1' src={img1} alt=''/><p>SkySnap</p>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto  mb-lg-0">
                                <li className="nav-item i1">
                                    <NavLink className="nav-a active" aria-current="page" to="#">Home</NavLink>
                                </li>
                                <li className="nav-item i2">
                                    <NavLink className="nav-a" to="/More">More</NavLink>
                                </li>
                            </ul>
                            <form className="d-flex" role="search" onSubmit={handleSubmit(realweather)}>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" {...register("city")} />
                                <button className="btn btn-outline-success" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigationbar
