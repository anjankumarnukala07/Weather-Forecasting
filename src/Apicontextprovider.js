import { cityContext } from "./context1";
import { useState } from "react";
import React from "react";
export const Apicontextprovider=({children})=>{
    const apikey = "db1d897186814bfa97c142206232611";
    let[data,setdata]=useState([]);
    let [weatherData,setweatherData]=useState([]);
    let [weatherData1,setweatherData1]=useState([]);
    let [hour,sethour]=useState([]);
    let [g,setg]=useState(false);
    let [city1,setcity1]=useState('');
    let realt = [];
    let reald1 = [];
    let reald2=[]
    let realh=[];
    let realweather = (obj) => {
        localStorage.setItem('city',obj.city);
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${obj.city}&days=14`;
        fetch(url).then(res => res.json())
            .then((cast) => {
                setdata(cast);
                setcity1(cast.location?.name);
                setg((prev)=>!prev);
                updategraph(cast);
                updategraph1(cast);
                hourdata(cast);
                console.log(cast);
            }).catch((error) => console.error(error))
    }
    let updategraph = (cast) => {
        let forecast = cast.forecast.forecastday;
        forecast.map(obj => {
            reald1.push(obj.date);
            realt.push(obj.day.avgtemp_c);
            return 0;
        });
        setweatherData({ dates: reald1, required: realt});
    }
     let updategraph1=(cast)=>{
     let forecast = cast.forecast.forecastday;
        forecast.map(obj => {
            reald2.push(obj.date);
            realh.push(obj.day.avghumidity);
            return 0;
        });
        setweatherData1({ dates: reald2, required: realh});
    }
    let hourdata=(cast)=>{
        sethour(cast.forecast.forecastday[0].hour);
    }
    let contextvalues={
        city1,g,data,realweather,weatherData,weatherData1,hour
    };
    return(
        <cityContext.Provider value={contextvalues}>
            {children}
        </cityContext.Provider>
    );
}
export default Apicontextprovider;