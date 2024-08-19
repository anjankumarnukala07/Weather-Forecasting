import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loginsignup from './Loginsignup';
import Signup from './Signup'; 
import More from './More';
import Home from './Home';
// import Navigationbar from './Navigationbar';

function ARoutes() {
  return (
    <Routes>
      {/* <Navigationbar/> */}
      <Route path="/" element={<Loginsignup />} />
      <Route path="/Signup" element={<Signup />} /> 
      <Route path="/Home" element={<Home />} /> 
      <Route path="/More" element={<More/>}/>
    </Routes>
  );
}

export default ARoutes;