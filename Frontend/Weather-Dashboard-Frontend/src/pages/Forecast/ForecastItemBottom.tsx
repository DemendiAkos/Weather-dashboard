import React from "react";
import { List } from "../../constants/forecastData";

interface Props {
  item: List;
}

function ForecastItemBottom(props: Props) {
  return (
    <>
      <div className="">
        <img
          src={`https://openweathermap.org/img/wn/${props.item.weather[0].icon}@2x.png`}
          alt={props.item.weather[0].description}
        />
        <p>{props.item.main.temp_min}</p>
        <p>{((props.item.wind.speed as number) * 3.6).toFixed(2)} <br /> km/h</p>
      </div>
    </>
  );
}

export default ForecastItemBottom;
