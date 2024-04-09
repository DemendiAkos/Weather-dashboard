import React, { useEffect, useState } from "react";
import { ForecastDataInterface, List } from "../../constants/forecastData";
import ForecastContainer from "./ForecastContainer";
import DailyForecast from "../Dashboard/DailyForecastContainer";
import { CurrentDataInterface } from "../../constants/currentData";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface Props {
  forecastData: ForecastDataInterface;
  temps: number[];
}


function ForecastPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let { cityName } = location.state || { cityName: "Bence" };
  const API_KEY = import.meta.env.VITE_API_KEY;

  const dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`; // api call for 5 day weather forecast
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`; // api call for current weather

  const [dailyForecastData, setDailyForecastData] = useState<ForecastDataInterface>();
  const [currentData, setCurrentData] = useState<CurrentDataInterface>();
  const [forecastTemperatures, setForecastTemperatures] = useState<number[]>(
    []
  );
  // fetching the data for the current weather usestate  
  useEffect(() => {
    async function FetchCurrentData() {
      const res = await fetch(weatherUrl);
      const data = await res.json();
      setCurrentData(data);
    }
    FetchCurrentData();
  }, [weatherUrl]);


  useEffect(() => {
    async function FetchDailyForecastData() {
      const res = await fetch(dailyForecastUrl);
      const data = await res.json();
      console.log(data)
      let date = new Date("");
      const list = data.list
      data.list = [];
      list.forEach((element: List) => {
        if (date.getDay() != new Date(element.dt_txt).getDay()) {
          date = new Date(element.dt_txt)
          data.list.push(element)
        }
      });
      data.list.shift()
      const temps = data.list.map((item: { main: { feels_like: number; }; }) =>
        Math.round(item.main.feels_like as number)
      );
      setDailyForecastData(data);
      setForecastTemperatures(temps);
    }
    FetchDailyForecastData();
  }, [dailyForecastUrl])

  if (!dailyForecastData || !dailyForecastData.list || dailyForecastData.list.length === 0) {
    return <div>No forecast data available</div>;
  }

  // checking if it sucks
  if (!currentData) {
    return <div>No current weather data available ¯\_(ツ)_/¯</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col text-xl font-bold">
      <DailyForecast
        currentweather={currentData}
        city={dailyForecastData.city.name}
      />

      <ForecastContainer
        forecastData={dailyForecastData}
        temps={forecastTemperatures}
      />
      <button className="
    absolute bottom-4 left-4 border-solid border-2 border-gray-600 rounded-full
    bg-blue-500 hover:bg-blue-700 text-black
    font-bold py-2 px-4 rounded 
    focus:outline-none focus:shadow-outline
    transition duration-300 ease-in-out
    transform hover:-translate-y-1 hover:scale-110
  " onClick={() => navigate('/dashboard')}>Back to current forecast</button>

    </div>

  );
}

export default ForecastPage;
