import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navigationbar from './Navigationbar'
import Sidebar from './Sidebar';
function RootLayout() {
    let [isOpen,setisOpen]=useState(false);
    let toggle=()=>{
        setisOpen(!isOpen);
    }
  return (
    <div>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navigationbar toggle={toggle}/>
        <Outlet/>
    </div>
  )
}

export default RootLayout
