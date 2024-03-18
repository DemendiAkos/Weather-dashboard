import React, { useEffect, useState } from "react";
import { ForecastDataInterface } from "../../constants/forecastData";
import { CurrentDataInterface } from "../../constants/currentData";
import HourlyForecastContainer from "./HourlyForecastContainer";
import DailyForecast from "./DailyForecastContainer";
import SearchBar from "./SearchBar";

function DashboardPage() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 24 / 3;
  const cityName = "Bence"; // Karakószörcsök
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`; // api call for current weather
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&cnt=${limit}`; // api call for 5 day weather forecast


  const [forecastData, setForecastData] = useState<ForecastDataInterface>();
  const [currentData, setCurrentData] = useState<CurrentDataInterface>(); 
  const [forecastTemperatures, setForecastTemperatures] = useState<number[]>(
    []
  );

  useEffect(() => {
    async function FetchForecastData() {
      const res = await fetch(forecastUrl);
      const data = await res.json();
      setForecastData(data);
      const temps = data.list.map((item: { main: { feels_like: number; }; }) =>
        Math.round(item.main.feels_like as number)
      );
      console.log(temps);
      setForecastTemperatures(temps);
      console.log(data);
      console.log(data.list[0].main.feels_like);
    }
    FetchForecastData();
  }, [forecastUrl]);


  // fetching the data for the current weather usestate  
  useEffect(() => {
    async function FetchCurrentData() {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        setCurrentData(data);
    }
    FetchCurrentData();
  }, [weatherUrl]);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return <div>No forecast data available</div>;
  }

  // checking if it sucks
  if (!currentData) {
    return <div>No current weather data available ¯\_(ツ)_/¯</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col text-xl font-bold">
      
      <SearchBar/>

      <DailyForecast
      currentweather={currentData}
      city={forecastData.city.name}
      />

      <HourlyForecastContainer
        forecastData={forecastData}
        temps={forecastTemperatures}
      />

    </div>
  );
}

export default DashboardPage;
