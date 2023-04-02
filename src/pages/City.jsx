import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { clientKey } from "../utils";
import "../App.css";
import humIcon from "./Images/hum.png";
import windIcon from "./Images/wind.png";
import uvIcon from "./Images/uv.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const City = ({ lat, long, cityName }) => {
  const [celsiusTemp, setCelsiusTemp] = useState(0);
  const [fahrenheitTemp, setFahrenheitTemp] = useState(0);
  const [icon, setIcon] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [uv, setUv] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);
  const [forecastday, setForecastday] = useState([]);

  const getWeatherData = async () => {
    let url = "";
    if (!cityName) {
      url = `http://api.weatherapi.com/v1/current.json?key=${clientKey}&q=${
        lat + "," + long
      }?end_dt=2023-03-30`;
    } else {
      url = `http://api.weatherapi.com/v1/current.json?key=${clientKey}&q=${cityName}`;
    }
    const response = await fetch(url);
    let data = await response.json();

    setCelsiusTemp(data.current.temp_c);
    setFahrenheitTemp(data.current.temp_f);
    setIcon(data.current.condition.icon);
    setWind(data.current.wind_kph);
    setUv(data.current.uv);
    setHumidity(data.current.humidity);
  };
  const getFutureData = async () => {
    let url = "";
    if (!cityName) {
      url = `http://api.weatherapi.com/v1/forecast.json?key=${clientKey}&days=8&aqi=no&alerts=no&q=${
        lat + "," + long
      }?end_dt=2023-03-30`;
    } else {
      url = `http://api.weatherapi.com/v1/forecast.json?key=${clientKey}&days=8&aqi=no&alerts=no&q=${cityName}`;
    }
    const response = await fetch(url);
    let data = await response.json();
    const arr = [...data.forecast.forecastday];
    arr.shift();
    setForecastday(arr);
  };

  useEffect(() => {
    getWeatherData();
    getFutureData();
  }, [cityName, lat, long]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div class="City m-4">
      <div className="row ">
        <div className="col">
          <img src={icon} alt="" style={{ width: "100px", height: "100px" }} />
        </div>

        <div className="ForC">
          <button
            type="button"
            className={isCelsius ? "btn light" : "btn"}
            onClick={() => setIsCelsius(true)}
          >
            <span className="ForC-font"> F</span>
          </button>
          <button
            type="button"
            className={isCelsius ? "btn" : "btn light"}
            onClick={() => setIsCelsius(false)}
          >
            <span className="ForC-font"> C</span>
          </button>
        </div>
      </div>

      <div className="row mb-3" style={{ minHeight: "170px" }}>
        <div className="col tempreture">
          {isCelsius === true ? (
            <div className="d-flex">
              <span>{fahrenheitTemp}</span>
              <b className="align-self-start" style={{ fontSize: "30px" }}>
                &#176; F
              </b>
            </div>
          ) : (
            <div className="d-flex">
              <span>{celsiusTemp}</span>
              <b className="align-self-start" style={{ fontSize: "30px" }}>
                &#176; C
              </b>
            </div>
          )}
        </div>

        <h2 className="col cityname"> {cityName}</h2>
      </div>

      <div className="d-flex justify-content-around py-3" id="details">
        <img src={windIcon} alt="" className="details-icons" />
        Wind
        <span>{wind}</span>
        km/h
        <span> | </span>
        <img src={humIcon} alt="" className="details-icons" />
        Humidity
        <span>{humidity}</span>%<span>|</span>
        <img src={uvIcon} alt="" className="details-icons" />
        UV
        <span>Index</span>
        {uv}
      </div>
      <div className="px-5">
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={false}
          ssr={true}
          infinite={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          style={{ width: "300px", height: "150px" }}
        >
          {forecastday.map((item) => (
            <div className="card-carousel p-3">
              {item.day.avgtemp_c}
              &#176;C
              <img
                src={icon}
                alt=""
                style={{ width: "50px", height: "50px" }}
                className="ms-5"
              />
              {new Date(item.date).toLocaleString("en-us", {
                weekday: "short",
              })}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default City;
