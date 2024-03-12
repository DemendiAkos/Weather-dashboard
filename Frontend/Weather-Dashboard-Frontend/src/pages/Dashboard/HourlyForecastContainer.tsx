import React from "react";
import { ForecastDataInterface } from "../../constans/forecastData";
import HourlyForecastItem from "./HourlyForecastItem";

interface Props {
  forecastData: ForecastDataInterface;
}

function HourlyForecastContainer(props: Props) {
  return (
    <div className="container flex  bg-gray-400 rounded-xl text-center justify-items-center items-center gap-9 text-white p-10">
      {props.forecastData.list.map((item, index) => (
        <HourlyForecastItem key={index} item={item} />
      ))}
    </div>
  );
}

export default HourlyForecastContainer;
