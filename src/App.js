import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  let Descript = {
    cloudy: "ابری",
    snow: "برفی",
    rain: "بارانی",
    sunny: "آفتابی",
    mist: "مه آلود",
    clear: "صاف",
  };

  useEffect(() => {
    setDate();
    setTime();
    setWeekd();
    getWeatherMain();
    getWeatherHistory();
  }, []);

  const [Time_head, setTime_head] = useState("");
  const [Date_head, setDate_head] = useState("");
  const [footerDay, setfooterDay] = useState("");
  const [weatherMainData, setWeatherMainData] = useState({});
  const [WeatherHistoryData, setWeatherHistoryData] = useState({});


  function getWeatherMain() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=rasht&units=metric&appid=85aae743aa906d977fc42906ff73c71c"
      )
      .then((result) => {
        setWeatherMainData((weatherMainData) => ({
          ...weatherMainData,
          temp: result.data.main.temp,
          descript: setWeatherStatus(result.data.weather[0].description),
          picture: setWeatherPicture(result.data.weather[0].main),
        }));
      })
      .catch((err) => {
        alert('خطا در دریافت اطلاعات')
      });
  }

  function getWeatherHistory() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=37.2808&lon=49.5832&units=metric&appid=85aae743aa906d977fc42906ff73c71c"
      )
      .then((result) => {
        let temps = [];
        let pics = [];
        for (var i = 0; i < 4; i++) {
          temps.push(result.data.hourly[i + 1].temp);
          pics.push(
            setWeatherPicture(result.data.hourly[i + 1].weather[0].main)
          );
        }
        setWeatherHistoryData((WeatherHistoryData) => ({
          ...WeatherHistoryData,
          temp: temps,
          picture: pics,
        }));
      })
      .catch((err) => {
        alert('خطا در دریافت اطلاعات')
      });
  }

  function setWeatherPicture(type) {
    if (type.includes("Mist")) {
      return require('./images/mist.svg');
    }
    if (type.includes("Rain")) {
      return require('./images/rain.svg');
    }
    if (type.includes("Cloud")) {
      return require("./images/cloudy.svg");
    }
    if (type.includes("Snow")) {
      return require('./images/snow.svg');
    }
    if (type.includes("Sunny")) {
      return require('./images/sunny.svg');
    }
    if (type.includes("Clear")) {
      return require("./images/clear.svg");
    }
  }

  function setWeatherStatus(type) {
    if (type.includes("mist")) {
      return Descript.mist;
    }
    if (type.includes("rain")) {
      return Descript.rain;
    }
    if (type.includes("cloud")) {
      return Descript.cloudy;
    }
    if (type.includes("snow")) {
      return Descript.snow;
    }
    if (type.includes("sunny")) {
      return Descript.sunny;
    }
    if (type.includes("clear")) {
      return Descript.clear;
    }
  }

  function setDate() {
    const date = new Date();
    const weekd = new Intl.DateTimeFormat("fa", {
      weekday: "long",
    }).format(date);

    const year = new Intl.DateTimeFormat("fa", {
      year: "numeric",
    }).format(date);

    const month = new Intl.DateTimeFormat("fa", {
      month: "long",
    }).format(date);

    const day = new Intl.DateTimeFormat("fa", {
      day: "numeric",
    }).format(date);

    setDate_head(weekd + "، " + day + " " + month + " " + year);
  }

  function setTime() {
    const date = new Date();
    let hour = date.getHours();
    let ampm = hour > 12 ? "بعد از ظهر" : "قبل از ظهر";
    hour = hour % 12;
    hour = hour ? hour : 12;
    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    setTime_head(hour + ":" + minute + " " + ampm);
  }

  function setWeekd() {
    const date = new Date();
    const weekd = new Intl.DateTimeFormat("fa", {
      weekday: "long",
    }).format(date);
    setfooterDay(weekd);
  }

  function setPictureMain() {
    if (weatherMainData.picture) {
      return (
        <img src={weatherMainData.picture} alt="weather status" id="main_pic" />
      );
    } else {
      return (
        <img
          src={require("./images/cloudy.svg")}
          alt="weather status"
          id="main_pic"
        />
      );
    }
  }

  function setTempMain() {
    if (weatherMainData.temp) {
      return <h1>{weatherMainData.temp}&deg;</h1>;
    } else {
      return <h1>10&deg;</h1>;
    }
  }

  function setStatusMain() {
    if (weatherMainData.descript) {
      return <h1>{weatherMainData.descript}</h1>;
    } else {
      return <h1>هوای ابری</h1>;
    }
  }

  function setTimeHistory(timetoback) {
    const date = new Date();
    let hour = date.getHours() - timetoback;
    let ampm = hour > 12 ? "بعد از ظهر" : "قبل از ظهر";
    hour = hour % 12;
    hour = hour ? hour : 12;
    return hour + " " + ampm;
  }

  function setHistoryData(index) {
    if (WeatherHistoryData.temp) {
      return (
        <div className="days txtcenter">
          <h6>{setTimeHistory(index + 1)}</h6>
          <img src={WeatherHistoryData.picture[index]} alt="weather status" />
          <h6>{WeatherHistoryData.temp[index]}&deg;</h6>
        </div>
      );
    } else {
      return (
        <div className="days txtcenter">
          <h6 id="time_1">12 قبل از ظهر</h6>
          <img
            src={require("./images/cloudy.svg")}
            alt="weather status"
            id="pic_1"
          />
          <h6 id="history_1">21&deg;</h6>
        </div>
      );
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="header flex-column wid100 fontwhite">
        <h3 id="date_text">{Date_head}</h3>
        <h1 id="time_text">{Time_head}</h1>
        <h3>رشت</h3>
      </div>
      <div className="main flex-column wid100 fontwhite">
        {setPictureMain()}
        {setStatusMain()}
        {setTempMain()}
      </div>
      <div className="footer wid100 fontwhite flex-column">
        <h4 id="footer_day">{footerDay}</h4>
        <hr className="fontwhite" />
        <div className="container-days wid100 fontwhite flex-row">
          {Array.from(Array(4), (e, i) => {
            return setHistoryData(i);
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
