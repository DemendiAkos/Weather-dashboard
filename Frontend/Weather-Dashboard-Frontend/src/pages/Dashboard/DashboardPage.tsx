import React, { useEffect, useState } from "react";
import { ForecastDataInterface } from "../../constants/forecastData";
import { CurrentDataInterface } from "../../constants/currentData";
import HourlyForecastContainer from "./HourlyForecastContainer";
import DailyForecast from "./DailyForecastContainer";
import SearchBar from "./SearchBar";

function DashboardPage() {
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 24/3;
  const [cityName, setCityName] = useState("Bence");  // Karakószörcsök
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`; // api call for current weather
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&cnt=${limit}`; // api call for 5 day weather forecast

 
  const [forecastData, setForecastData] = useState<ForecastDataInterface>();
  const [currentData, setCurrentData] = useState<CurrentDataInterface>(); 
  const [forecastTemperatures, setForecastTemperatures] = useState<number[]>(
    []
  );

  useEffect(() => {
    async function FetchCurrentData() {
      try {
        const res = await fetch(weatherUrl);
        if (!res.ok) throw new Error('Failed to fetch weather data.');
        const data = await res.json();
        setCurrentData(data);
        setError(""); 
      } catch (error) {
        console.error(error);
        setError("The specified city doesn't exist or can't be reached. Please try another city.");
      }
    }
    FetchCurrentData();
  }, [weatherUrl]);
  
  useEffect(() => {
    async function FetchForecastData() {
      try {
        const res = await fetch(forecastUrl);
        if (!res.ok) throw new Error('Failed to fetch forecast data.');
        const data = await res.json();
        setForecastData(data);
        setError(""); 
        const temps = data.list.map((item: { main: { feels_like: number; }; }) =>
        Math.round(item.main.feels_like as number)
      );
        setForecastTemperatures(temps);
      } catch (error) {
        console.error(error);
        setError("The specified city doesn't exist or can't be reached. Please try another city.");
      }
    }
    FetchForecastData();
  }, [forecastUrl]);
  
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return <div>No forecast data available</div>;
  }

  // checking if it sucks
  if (!currentData) {
    return <div>No current weather data available ¯\_(ツ)_/¯</div>;
  }

  // updates the city name
  const handleCityChange = (newCityName: string) => {
    setCityName(newCityName);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col text-xl font-bold">
      <SearchBar onCityChange={handleCityChange} 
      />
      {error && <div className="text-sm text-red-500">{error}</div>} 
      
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
