import { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function Show() {
  const [data, setData] = useState({
    name: "", main: {
      temp: 0
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
    }
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

  
  
  const choose = () => {
    if (city !== "") getApiData();
  }

  //   function getlocation(){
  //    if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(success, error);
  // } else {
  //   console.log("Geolocation not supported");
  // }

  // }

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: '#4788c9' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-6 col-lg-6 col-xl-6">
            <div className="card" style={{ color: '#4B515D', borderRadius: '35px' }}>
              <div className="card-body p-4 image" >
                <div className="d-flex">
                  <div className="search-container ">
                    <input className="inpbox" type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
                    <button className="buttonn" onClick={choose} >Search</button>
                  </div>
                </div>
                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}> {data.main.temp}°C </h6>
                  <span style={{ color: '#868B94' }}>{data.name}</span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                    <div><i className="fas fa-wind fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1"><b>Deg: </b>{data.wind.deg}</span></div>
                    <div><i className="fas fa-tint fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1"><b>Speed: </b>{data.wind.speed}</span></div>
                    <div><i className="fas fa-sun fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1"><b>Gust: </b>{data.wind.gust}</span></div>
                  </div>
                  <div><b>Icon: </b>{data.weather[0].icon} <div><b>Weather: </b>{data.weather[0].main}</div><div><b>Details: </b>{data.weather[0].description}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Show;
