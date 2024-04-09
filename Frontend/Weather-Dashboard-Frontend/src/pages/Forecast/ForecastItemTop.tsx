import React from "react";
import { List } from "../../constants/forecastData";

interface Props {
  item: List;
}

function ForecastItemTop(props: Props) {
  return (
    <>
    <div className="bg-midnight rounded bg-opacity-50">
        <p  className="text-lg">
        {new Date(props.item.dt * 1000).toDateString().slice(3,-4)}
        <br />
        {Math.round(props.item.main.feels_like as number)}°C
      </p>
      <img
          src={`https://openweathermap.org/img/wn/${props.item.weather[0].icon}@2x.png`}
          alt={props.item.weather[0].description}
        />
    </div>
    <div className="bg-midnight rounded bg-opacity-50">
    </div>
    </>
  );
}

export default ForecastItemTop;
