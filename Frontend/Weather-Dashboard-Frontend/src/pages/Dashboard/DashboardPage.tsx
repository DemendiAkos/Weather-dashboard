import React, { useEffect, useState } from "react";
import { ForecastDataInterface } from "../../constants/forecastData";
import { CurrentDataInterface } from "../../constants/currentData";
import HourlyForecastContainer from "./HourlyForecastContainer";
import DailyForecast from "./DailyForecastContainer";
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from 'react-router-dom';



function DashboardPage() {

  
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 24 / 3;
  const [cityName, setCityName] = useState("Bence"); // Karakószörcsök
  
  let location = useLocation();
  let state = location.state as { cityName?: string } | null;
  
  // When the component mounts or when the location state changes
  useEffect(() => {
    if (state?.cityName) {
      setCityName(state.cityName);
    }
  }, [state]);
  
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
      const temps = data.list.map((item: { main: { feels_like: number } }) =>
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
      try {
        const res = await fetch(weatherUrl);
        if (!res.ok) throw new Error("Failed to fetch weather data.");
        const data = await res.json();
        setCurrentData(data);
        setError("");
      } catch (error) {
        console.error(error);
        setError(
          "The specified city doesn't exist or can't be reached. Please try another city."
        );
      }
    }
    FetchCurrentData();
  }, [weatherUrl]);

  useEffect(() => {
    async function FetchForecastData() {
      try {
        const res = await fetch(forecastUrl);
        if (!res.ok) throw new Error("Failed to fetch forecast data.");
        const data = await res.json();
        setForecastData(data);
        setError("");
        const temps = data.list.map((item: { main: { temp: number } }) =>
          Math.round(item.main.temp as number)
        );
        setForecastTemperatures(temps);
      } catch (error) {
        console.error(error);
        setError(
          "The specified city doesn't exist or can't be reached. Please try another city."
        );
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
      <SearchBar onCityChange={handleCityChange} />
      {error && <div className="text-sm text-red-500">{error}</div>}

      <DailyForecast
        currentweather={currentData}
        city={forecastData.city.name}
      />

      <HourlyForecastContainer
        forecastData={forecastData}
        temps={forecastTemperatures}
      />
      <button
        className="
    absolute bottom-4 right-4 border-solid border-2 border-gray-600 rounded-full
    bg-blue-500 hover:bg-blue-700 text-black 
    font-bold py-2 px-4 rounded 
    focus:outline-none focus:shadow-outline
    transition duration-300 ease-in-out
    transform hover:-translate-y-1 hover:scale-110
  "
        onClick={() => navigate(`/forecast/${cityName}`, { state: { cityName } })}

      >
        Go to 5 day forecast
      </button>
    </div>
  );
}

export default DashboardPage;
