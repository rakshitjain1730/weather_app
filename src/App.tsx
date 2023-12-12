import { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function Show() {
  const [data, setData] = useState({
    name: "", main: {
      temp: 0,
      humidity: 0,
      temp_min: 0,
      temp_max: 0,
      feels_like: 0,
      pressure: 0,
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
    clouds: {
      all: 0
    },
    dt: 0,
  });
  const [city, setCity] = useState('');
  const [geolocationBlocked, setGeolocationBlocked] = useState(false);
  // const [unit, setUnit] = useState('metric');

  const getApiData = async () => {
    try {
      const call = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=50&lon=10&appid=a2077c513da51931438ac4e50dd53c26&units=metric`);

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

  function error() {
    console.log("user block geolocation")
    setGeolocationBlocked(true);
    // alert("you block your geolocation")
  }

  // const switchUnit = () => {
  //   setUnit(unit === 'metric' ? 'imperial' : 'metric');
  // };
  
  const Pos = async (position:GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a2077c513da51931438ac4e50dd53c26&units=metric`)
    console.log(response.data);
    setData(response.data);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(Pos, error);
    }
    else {
      console.log("Geolocation not supported by broweser");
    }
  }

  const choose = () => {
    if (city !== "") getApiData();
    setGeolocationBlocked(false);
  }

  useEffect(() => {
    getApiData();
    getLocation()
  }, []);

  return (
    <div className="container">
      <div className="weather__header">
        <div className="search-container ">
          <input type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
          <button className="btt" onClick={choose} >Search</button>
        </div>
       
        <div className="weather__units">
          <span className="weather_unit_celsius">{data.main.temp}&#176;C</span>
          <br />
          <span className="weather_unit_fahrenheit">{data.main.temp}&#176;F</span>
        </div>
      </div>
      
      {geolocationBlocked ? (
        <div className="geolocation-blocked" >
          <img src={require('./errorimg.jpeg')} alt="Blocked Geolocation" />
        </div>
      ) :
      <>
      <div className="weather__body">
        <h1 className="weather__city">{data.name}</h1>
        {/* <div className="weather__datetime"></div> */}
        {/* <div className="weather__forecast"></div> */}
        <div className="weather__icon">{data.weather[0].main}</div>
        {/* <p className="weather__temperature" onClick={switchUnit}> {unit === 'metric' ? `${data.main.temp}°C` : `${(data.main.temp * 9 / 5) + 32}°F`}<h6>click hear to convert this into C & F</h6></p> */}
        <div className="weather__minmax">
          <p>Min: {data.main.temp_min}&#176;</p>
          <p>Max: {data.main.temp_max}&#176;</p>
        </div>
      </div>
     
      <div className="weather__info">
        <div className="weather__card">
          <div>
            <p>Feel's like</p>
            <p className="weather__realfeel">{data.main.feels_like}&#176;</p>
          </div>
        </div>
        <div className="weather__card">
          <div>
            <p>Humidity</p>
            <p className="weather__humidity">{data.main.humidity}&#176;</p>
          </div>
        </div>
        <div className="weather__card">
          <div>
            <p>Speed</p>
            <p className="weather__wind">{data.wind.speed}&#176;</p>
          </div>
        </div>

        <div className="weather__card">
          <div>
            <p>Pressure</p>
            <p className="weather__pressure">{data.main.pressure}&#176;</p>
          </div>
        </div>
        <div className="weather__card">
          <div>
            <p>Gust</p>
            <p className="weather__wind">{data.wind.gust}&#176;</p>
          </div>
        </div>
        <div className="weather__card">
          <div>
            <p>Deg</p>
            <p className="weather__wind">{data.wind.deg}&#176;</p>
          </div>
        </div>
      
      </div>
      </>
      }
    </div>
  )
}
export default Show;
