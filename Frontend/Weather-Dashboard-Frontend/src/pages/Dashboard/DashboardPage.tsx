import React, { useEffect, useState } from "react";

function DashboardPage() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 24 / 3;
  const cityname = "Budapest";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}&units=metric&cnt=${limit}`;

  const [forecastData, setForecastData] = useState<any>();

  useEffect(() => {
    async function FetchForecastData() {
      const res = await fetch(forecastUrl);
      const data = await res.json();
      setForecastData(data);
      console.log(data);
      console.log(data.list[0].weather[0].icon);
    }
    FetchForecastData();
  }, [forecastUrl]);

  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${forecastData?.list[0].weather[0].icon}@2x.png`}
        alt="asd"
      />
    </div>
  );
}

export default DashboardPage;
