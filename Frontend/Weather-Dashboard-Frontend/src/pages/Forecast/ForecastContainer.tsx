import React, { useRef, useState, useEffect } from "react";
import { ForecastDataInterface } from "../../constants/forecastData";
import LineChart from "../../components/LineChart";
import ForecastItem from "./ForecastItemBottom";
import ForecastItemBottom from "./ForecastItemBottom";
import ForecastItemTop from "./ForecastItemTop";

interface Props{
  forecastData: ForecastDataInterface;
  temps: number[];
}

function ForecastContainer(props: Props) {
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
      <div className="flex absolute justify-between mb-4 transform -translate-y-40" style={{ width: divWidth * 1.22, height: divHeight*2.6}}>
        {props.forecastData.list.map((item, index) => (
          <ForecastItemTop key={index} item={item}/>
        ))}
      </div>
      <div className="pl-10 pr-10 pt-8" style={{ width: divWidth*1.20, height: divHeight / 1.5 }}>
        <LineChart temps={props.temps} />
      </div>
      <div className="flex justify-between  z-10" style={{width: divHeight*3.5}} ref={divRef}>
        {props.forecastData.list.map((item, index) => (
          <ForecastItemBottom key={index} item={item} />
        ))}
      </div>
    </div>
  );
}


export default ForecastContainer;
