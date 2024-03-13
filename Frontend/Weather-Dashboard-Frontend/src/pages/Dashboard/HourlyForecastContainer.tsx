import React from "react";
import { ForecastDataInterface } from "../../constans/forecastData";
import HourlyForecastItem from "./HourlyForecastItem";
import LineChart from "../../components/LineChart";

interface Props {
  forecastData: ForecastDataInterface;
  temps: number[];
}

function HourlyForecastContainer(props: Props) {
  return (
    <div className="container flex flex-col bg-gray-400 rounded-xl text-center justify-items-center items-center gap-9 text-white p-10">
      <div className="flex">
        {props.forecastData.list.map((item, index) => (
          <HourlyForecastItem key={index} item={item} />
        ))}
      </div>
      <div className="w-6/12 h-2/4 ">
        <LineChart temps={props.temps} />
      </div>
    </div>
  );
}

export default HourlyForecastContainer;
