import React from "react";
import { CurrentDataInterface } from "../../constants/currentData";

interface Props {
  currentweather: CurrentDataInterface;
  city: string;
}

function DailyForecast(props: Props) {
  return (
    <div className=" p-6  md:container md:mx-auto">
      <h1 className="text-4xl mb-2">{props.city}</h1>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl">Now</p>
          <h2 className="text-6xl font-bold">{Math.round(props.currentweather.main.temp)}°C</h2>
          <p className="text-xl">{props.currentweather.weather[0].main}</p>
          <p className="text-md">Feels like {Math.round(props.currentweather.main.feels_like)}°</p>
        </div>
        <div>
          <h3 className="text-3xl font-medium">
            High {Math.round(props.currentweather.main.temp_max)}° Low {Math.round(props.currentweather.main.temp_min)}°
          </h3>
        </div>
      </div>
    </div>
  );
}

export default DailyForecast;
