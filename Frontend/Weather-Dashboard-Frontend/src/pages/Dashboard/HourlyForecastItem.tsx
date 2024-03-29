import React from "react";
import { List } from "../../constants/forecastData";

interface Props {
  item: List;
}

function HourlyForecastItem(props: Props) {
  return (
    <>
      <div className="p-3">
        <img
          src={`https://openweathermap.org/img/wn/${props.item.weather[0].icon}@2x.png`}
          alt={props.item.weather[0].description}
        />
        <p>{((props.item.wind.speed as number) * 3.6).toFixed(2)}km/h</p>
        <p>{new Date(props.item.dt * 1000).getHours()}:00</p>
      </div>
    </>
  );
}

export default HourlyForecastItem;
