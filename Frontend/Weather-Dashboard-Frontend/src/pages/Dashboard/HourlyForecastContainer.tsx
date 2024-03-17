import React, { useRef, useState, useEffect } from "react";
import { ForecastDataInterface } from "../../constants/forecastData";
import HourlyForecastItem from "./HourlyForecastItem";
import LineChart from "../../components/LineChart";

interface Props {
  forecastData: ForecastDataInterface;
  temps: number[];
}

function HourlyForecastContainer(props: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState<number>(0);
  const [divHeight, setDivHeight] = useState<number>(0);

  useEffect(() => {
    const updateDivSize = () => {
      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        const newWidth =
          width - width / props.forecastData.list.length + width * 0.02;
        setDivWidth(newWidth);
        setDivHeight(height);
      }
    };

    updateDivSize();

    window.addEventListener("resize", updateDivSize);
    return () => window.removeEventListener("resize", updateDivSize);
  }, [divHeight, divWidth, props.forecastData.list.length]);

  return (
    <div className="container flex flex-col bg-white rounded-xl text-center items-center text-gray-800 p-6 shadow-md overflow-x-auto">
      <div className="flex justify-between mb-4" style={{ width: divWidth }}>
        {props.forecastData.list.map((item, index) => (
          <p key={index} className="text-lg">
            {Math.round(item.main.feels_like as number)}°C
          </p>
        ))}
      </div>
      <div style={{ width: divWidth, height: divHeight / 1.5 }}>
        <LineChart temps={props.temps} />
      </div>
      <div className="flex flex-row justify-start" ref={divRef}>
        {props.forecastData.list.map((item, index) => (
          <HourlyForecastItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HourlyForecastContainer;
