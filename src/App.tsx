import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import clone from "./instance";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  const getapiData = async () => {
    try {
      const show = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?={city}&lat=50&lon=10&appid=5a2401eb7e3e3d20ba72fc0050c7d97a&q"
      );
      console.log(show.data);
      setData(show.data);
    } catch (error) {
      console.log(error);
    }
  };

  const choose = () => {
    if (city.trim() !== "") getapiData();
  };

  useEffect(() => {
    getapiData();
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={choose}>Search</button>
            </div>
            {data && (
              <div>
                <h2>Weather Information</h2>
                <p>Location: {data.name}</p>
                <p>Temperature: {data.main && data.main.temp}</p>
                <p>
                  Description: {data.weather && data.weather[0].description}
                </p>
                <p>Description: {data.wind && data.wind.speed}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
