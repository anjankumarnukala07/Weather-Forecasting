import React, { useState, useEffect, useContext, useMemo } from 'react';
import { BsCloudSun, BsWind, BsThermometerSun } from "react-icons/bs";
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import './Home1.css';
import { cityContext } from './context1';
//import img2 from './images/img2.jpg'
import Tgraph from './Tgraph';
import Updategraph from './Updategraph';
function Home() {
    const apikey = "db1d897186814bfa97c142206232611";
    let { g, data, realweather, weatherData } = useContext(cityContext);
    let [cdata, setcdata] = useState([]);
    let [gdata, setgdata] = useState({});
    let { register, handleSubmit } = useForm();
    let tdata = useMemo(() => ["Delhi", "Mumbai", "Kolkata", "Chennai"], []);
    let locate = [];
    let temperate = [];
    useEffect(() => {
        let fetchData = (city) => {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=14`;
            fetch(url).then(res => res.json())
                .then((cast) => {
                    console.log(cast);
                    setcdata((prevData) => [...prevData, cast]);
                    temperate.push(cast.current?.temp_c);
                    locate.push(cast.location?.name);
                    setgdata({ dates: locate, required: temperate });
                }).catch((error) => console.error(error))
        }
        tdata.forEach((city) => {
            fetchData(city);
        });
       
    }, [tdata, apikey]);
    return (
        <div>
            <div className="container">
                <h1 className="my-4 text-center">{data.location?.name}</h1>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div className="col">
                        <div className="card card1 mb-4 rounded-3 shadow-sm">
                            {/* <img src={img2} alt=''/> */}
                            <h4 className="my-0 fw-normal align-center py-3">Temperatures <BsThermometerSun id='icon1' /></h4>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title text-body-secondary fw-light"> </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Temperature is {data.current?.temp_c}C</li>
                                    {/* <li>{data.current?.condition.text}</li> */}
                                    <li>Min temp is {data.forecast?.forecastday[0].day.mintemp_c}C</li>
                                    <li>max temp is {data.forecast?.forecastday[0].day.maxtemp_c}C</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card card1 mb-4 rounded-3 shadow-sm">
                            <h4 className="my-0 fw-normal align-center py-3">Wind info <BsWind id='icon1' /></h4>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title text-body-secondary fw-light"> </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li> wind_speed is {data.current?.wind_kph}Km/hr</li>
                                    <li> Feels like is {data.current?.feelslike_c}</li>
                                    <li>Humidity is {data.current?.humidity}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card card1 mb-4 rounded-3 shadow-sm">
                            <h4 className="my-0 fw-normal py-3 align-center">Sun information <BsCloudSun id='icon1' /></h4>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title"><small
                                    className="text-body-secondary fw-light"></small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>{data.forecast?.forecastday[0].astro.is_sun_up ? "Moon up" : "Sun Up"}</li>
                                    <li>Sunrise at {data.forecast?.forecastday[0].astro.sunrise}</li>
                                    <li>Sunset at {data.forecast?.forecastday[0].astro.sunset}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {g && <Updategraph weatherData={weatherData} />}
                <hr/>
                {gdata && <Tgraph rdata={gdata} />}
            </div>
            <div className='container tab1'>
                <table className="table" >
                    <thead>
                        <tr>
                            <th scope="col">City</th>
                            <th scope="col">Temperature(in C)</th>
                            <th scope="col">Sunrise</th>
                            <th scope="col">Sunset</th>
                            <th scope="col">RainFall(in mm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tdata.map((city, index) => {
                            const cityData = cdata[index] || null;
                            return (
                                <tr key={index}>
                                    <th scope='row'>{cityData ? cityData.location?.name : 'Loading..'}</th>
                                    <td>{cityData ? cityData.current.temp_c : 'Loading..'}</td>
                                    <td>{cityData ? cityData.forecast.forecastday[0].astro.sunrise : 'Loading..'}</td>
                                    <td>{cityData ? cityData.forecast.forecastday[0].astro.sunset : 'Loading..'}</td>
                                    <td>{cityData ? cityData.forecast.forecastday[0].day.totalprecip_mm : 'Loading..'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <form className="d-flex" id="jio" role="search">
                    <input className="form-control me-2" type="search" placeholder="Chat with us" aria-label="Search" {...register("query")} />
                    <button className="btn btn-outline-success" type="submit" id="submit1">Submit</button>
                </form> */}
            </div>
        </div>
    )
}
export default Home
