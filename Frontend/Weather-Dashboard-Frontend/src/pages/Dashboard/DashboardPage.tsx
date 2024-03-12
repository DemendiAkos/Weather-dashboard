import React, { useEffect, useState } from "react";
import { ForecastDataInterface } from "../../constans/forecastData";
import HourlyForecastContainer from "./HourlyForecastContainer";

function DashboardPage() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 24 / 3;
  const cityName = "Debrecen";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&cnt=${limit}`;

  const [forecastData, setForecastData] = useState<ForecastDataInterface>();

  useEffect(() => {
    async function FetchForecastData() {
      const res = await fetch(forecastUrl);
      const data = await res.json();
      setForecastData(data);
      console.log(data);
      console.log(data.list[0].main.feels_like);
    }
    FetchForecastData();
  }, [forecastUrl]);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return <div>No forecast data available</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="text-6xl mb-10">{cityName}</div>
      <HourlyForecastContainer forecastData={forecastData} />
    </div>
  );
}

export default DashboardPage;
