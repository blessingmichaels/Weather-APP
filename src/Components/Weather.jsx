import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import { IoSearch } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { PiWindLight } from "react-icons/pi";
import { BsCloudDrizzleFill } from "react-icons/bs";
import { FaCloudSunRain } from "react-icons/fa";
import { WiDaySnowWind } from "react-icons/wi";
import { CiCloudOn } from "react-icons/ci";

const Weather = () => {

    const inputRef = useRef()
    const [WeatherData, setWeatherData]= useState(false);

    const allIcons = {
        "01d": IoIosSunny,
        "01n": WiHumidity,
        "02d": PiWindLight,
        "02n": BsCloudDrizzleFill,
        "03d": FaCloudSunRain,
        "03n": FaCloudSunRain,
        "04d": CiCloudOn,
        "04n": CiCloudOn,
        "09d": WiDaySnowWind,
        "09n": WiDaySnowWind,
        "10d": IoIosSunny,
        "10n": IoIosSunny,
        "13d": BsCloudDrizzleFill,
        "13n":  PiWindLight,

    };

    const search = async (city)=> {
       if(city === ""){
        alert("Enter City Name");
        return;
       }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || IoIosSunny;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect(()=>{
        search("Italy");
    },[])

  return (
    <div className='weather'> 
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <div className='icon'>
        <IoSearch className='icon_1' onClick={()=>search(inputRef.current.value)}/>
        </div>
      </div>
      {WeatherData?<>
        <WeatherData.icon className="icon_2" />
        {/* <IoIosSunny className='icon_2'/> */}
      {/* <div className='icon_2'>{WeatherData.icon}</div> */}
      <p className='temperature'>{WeatherData.temperature}<sup>o</sup>C</p>
      <p className='location'>{WeatherData.location}</p>
      <div className="weather-data">
        <div className="col">
        <WiHumidity   className='icon_3'/>
        <div>
            <p>{WeatherData.humidity} %</p>
            <span>Humidity</span>
        </div>
        </div>
        <div className="col">
        <PiWindLight className='icon_3' />
        <div>
            <p>{WeatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
        </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather;
