import React, { useEffect, useState } from "react";

function DashboardPage() {
  const cityname = "Budapest";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${proccess.env.API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${proccess.env.API_KEY}&units=metric`;

  return <div></div>;
}

export default DashboardPage;
