import React from "react";
import { CurrentDataInterface } from "../../constants/currentData";

interface Props {
  currentweather: CurrentDataInterface;
}

function DailyForecast(props: Props) {
  return <div>
     <p>{Math.round(props.currentweather.main.temp)}°C</p>
  </div>
}

export default DailyForecast;
