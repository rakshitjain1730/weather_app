import { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function Show() {
  const [data, setData] = useState({
    name: "", main: {
      temp: 0,
      humidity:0,
      temp_min:0,
      temp_max:0
    }, weather: [{
      id: 0,
      main: "",
      description: "",
      icon: ""
    }],
    wind: {
      speed: 0,
      deg: 0,
      gust: 0
    },
    clouds:{
      all : 0
    },
    dt:0,
  });
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');

  const getApiData = async () => {
    try {
      const call = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=50&lon=10&appid=5a2401eb7e3e3d20ba72fc0050c7d97a&units=metric`);

      console.log("res", call)
      console.log("data", call.data);
      setData(call.data);
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 404) {
        alert("Not found")
      } else {
        alert("Error while fetching api")
      }
    }
  }

  const switchUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const choose = () => {
    if (city !== "") getApiData();
  }

  useEffect(() => {
    getApiData();
  }, []);

  return (
    // <section className="vh-100" style={{ backgroundColor: '#4788c9' }}>
    //   <div className="container py-5 h-100">
    //     <div className="row d-flex justify-content-center align-items-center h-100">
    //       <div className="col-md-6 col-lg-6 col-xl-6">
    //         <div className="card" style={{ color: '#4B515D', borderRadius: '35px' }}>
    //           <div className="card-body p-4 image" >
    //             <div className="d-flex">
    // <div className="search-container ">
    //   <input className="inpbox" type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
    //   <button className="buttonn" onClick={choose} >Search</button>
    // </div>
    //             </div>
    //             <div className="d-flex flex-column text-center mt-5 mb-4">
    //               <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }} onClick={switchUnit}> {unit === 'metric' ? `${data.main.temp}°C` : `${(data.main.temp * 9/5) + 32}°F`} </h6>
    //               <span style={{ color: '#868B94' }}>{data.name}</span>
    //             </div>

    //             <div className="d-flex align-items-center">
    //               <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
    //                 <div><i className="fas fa-wind fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1"><b>Deg: </b>{data.wind.deg}</span></div>
    //                 <div><i className="fas fa-tint fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1"><b>Speed: </b>{data.wind.speed}</span></div>
    //                 <div><i className="fas fa-sun fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1"><b>Gust: </b>{data.wind.gust}</span></div>
    //               </div>
    //               <div><b>Icon: </b>{data.weather[0].icon} <div><b>Weather: </b>{data.weather[0].main}</div><div><b>Details: </b>{data.weather[0].description}</div></div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // <div className="container">
    //   <div className="weather-side">
    //     <div className="weather-gradient">
    //       <div className="date-container">
    //         <h2 className="date-dayname">Tuesday</h2>
    //         <span className="date-day">{data.dt}</span>
    //         <i className="location-icon" data-feather="map-pin"></i>
    //         <span className="location">{data.name}</span>
    //       </div>
    //       <div className="weather-container">
    //         <i className="weather-icon" data-feather="sun"></i>
    //         <h1 className="weather-temp" onClick={switchUnit}> {unit === 'metric' ? `${data.main.temp}°C` : `${(data.main.temp * 9 / 5) + 32}°F`}</h1>
    //         <h3 className="weather-desc">{data.weather[0].description}</h3>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="info-side">
    //     <div className="today-info-container">
    //       <div className="today-info">
    //         <div className="precipitation">
    //           <span className="title">PRECIPITATION</span>
    //           <span className="value">0 %</span>
    //           <div className="clear"></div>
    //         </div>
    //         <div className="humidity">
    //           <span className="title">HUMIDITY</span>
    //           <span className="value">{data.main.humidity}</span>
    //           <div className="clear"></div>
    //         </div>
    //         <div className="wind">
    //           <span className="title">WIND</span>
    //           <span className="value">{data.wind.speed}</span>
    //           <div className="clear"></div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="week-container">
    //       <ul className="week-list">
    //         <li className="active">
    //           <i className="day-icon" data-feather="sun"></i>
    //           <span className="day-name">Tue</span>
    //           <span className="day-temp">29°C</span>
    //         </li>
    //         <li>
    //           <i className="day-icon" data-feather="cloud"></i>
    //           <span className="day-name">Wed</span>
    //           <span className="day-temp">21°C</span>
    //         </li>
    //         <li>
    //           <i className="day-icon" data-feather="cloud-snow"></i>
    //           <span className="day-name">Thu</span>
    //           <span className="day-temp">08°C</span>
    //         </li>
    //         <li>
    //           <i className="day-icon" data-feather="cloud-rain"></i>
    //           <span className="day-name">Fry</span>
    //           <span className="day-temp">19°C</span>
    //         </li>
    //         <div className="clear"></div>
    //       </ul>
    //     </div>
    //     <div className="location-container">
    //       <button className="location-button">
    //         <i data-feather="map-pin"></i>
    //         <div className="search-container ">
    //           <input className="inpbox" type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
    //           <button className="buttonn" onClick={choose} >Search</button>
    //         </div>
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="container">
      <div className="weather__header">
        <div className="search-container ">
      <input  type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
      <button className="btt"  onClick={choose} >Search</button>
    </div>
        {/* <div className="weather__units">
          <span className="weather_unit_celsius">&#176;C</span>
          <span className="weather_unit_fahrenheit">&#176;F</span>
        </div> */}
      </div>
      <div className="weather__body">
        <h1 className="weather__city">{data.name}</h1>
        <div className="weather__datetime"></div>
        <div className="weather__forecast"></div>
        <div className="weather__icon"></div>
        <p className="weather__temperature"onClick={switchUnit}> {unit === 'metric' ? `${data.main.temp}°C` : `${(data.main.temp * 9 / 5) + 32}°F`}</p>
        <div className="weather__minmax">
          <p>Min: {data.main.temp_min}&#176;</p>
          <p>Max: {data.main.temp_max}&#176;</p>
        </div>
      </div>

      <div className="weather__info">
        <div className="weather__card">
          <i className="fa-solid fa-temperature-full"></i>
          <div>
            <p>Real Feel</p>
            <p className="weather__realfeel">18&#176;</p>
          </div>
        </div>
        <div className="weather__card">
          <i className="fa-solid fa-droplet"></i>
          <div>
            <p>Humidity</p>
            <p className="weather__humidity">18&#176;</p>
          </div>
        </div>
        <div className="weather__card">
          <i className="fa-solid fa-wind"></i>
          <div>
            <p>Wind</p>
            <p className="weather__wind">18&#176;</p>
          </div>
        </div>
        <div className="weather__card">
          <i className="fa-solid fa-gauge-high"></i>
          <div>
            <p>Pressure</p>
            <p className="weather__pressure">18&#176;</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Show;
