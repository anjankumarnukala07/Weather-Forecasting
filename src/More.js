import React, { useContext, useState } from 'react'
import { cityContext } from './context1';
import Graph from './Graph';
import './More.css'
import { GiWaterDrop } from "react-icons/gi";
import { WiDaySunny } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
// import { IoIosArrowDown } from "react-icons/io";
import { GoChevronDown } from "react-icons/go";
//import { useForm } from 'react-hook-form';
//import Navigationbar from './Navigationbar';
function More() {
  //const apikey = "db1d897186814bfa97c142206232611";
  let { hour, weatherData1, g } = useContext(cityContext);
  let [anjan, setanjan] = useState(false);
  // let [weatherData1, setweatherData1] = useState([]);
  // let reald2 = [];
  // let realh = [];
  // //let city1 = localStorage.getItem('city')
  // let realweather1 = (city1) => {
  //   const url = `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city1}&days=14`;
  //   fetch(url).then(res => res.json())
  //     .then((cast) => {
  //       updategraph1(cast);
  //     }).catch((error) => console.error(error))
  // }
  // let updategraph1 = (cast) => {
  //   let forecast = cast.forecast.forecastday;
  //   forecast.map(obj => {
  //     reald2.push(obj.date);
  //     realh.push(obj.day.avghumidity);
  //     return 0;
  //   });
  //   setweatherData1({ dates: reald2, required: realh });
  // }
  // console.log(weatherData1);
  // useEffect(() => {
  //   realweather1(city1);
  // }, []);
  // console.log(weatherData1)
  let change = () => {
    setanjan((prev) => !prev);
  }
  return (
    <div>
      {/* <Navigationbar /> */}
      <div className='container more1'>
        <div className='c1'>
          {g && <Graph redata={weatherData1} />}
          {/* {g && <Graph redata={weatherData1} />} */}
        </div>
        <div className='datatf'>
          {hour.map(obj => {
            return (
              <div className="card c2">
                <div className="card-body">
                  <div className='tf'>
                    <p className='time'>{obj?.time}</p>
                    <img className='ic my-2' src={`http:${obj?.condition.icon}`} alt='N' />
                    <p className='icon-text'>{obj?.condition.text}</p>
                    <p className='temp'>{obj?.temp_c}C</p>
                    <p className='prep'><GiWaterDrop id='icon12'/>{obj?.precip_mm}</p>
                    <p className='uv'><WiDaySunny id='icon12'/>{obj?.uv}</p>
                    <p className='wind'><LuWind id='icon12'/>{obj?.wind_kph}km/hr</p>
                    <button className="btn" onClick={change}><GoChevronDown id='icon' /></button>
                  </div>
                  <div className="me-auto">
                  {anjan &&
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  }
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default More;