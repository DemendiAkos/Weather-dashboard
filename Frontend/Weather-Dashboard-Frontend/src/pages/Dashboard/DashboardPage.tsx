import React, { useEffect, useState } from "react";

function DashboardPage() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const cityname = "Budapest";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}&units=metric`;

  return <div></div>;
}

export default DashboardPage;
