import React , {useEffect, useState} from "react";
import { ForecastDataInterface, List } from "../../constants/forecastData";
import ForecastContainer from "./ForecastContainer";
import DailyForecast from "../Dashboard/DailyForecastContainer";
import { CurrentDataInterface } from "../../constants/currentData";


interface Props {
  forecastData: ForecastDataInterface;
  temps: number[];
}


function ForecastPage() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const cityName = "Aszód"
  const dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`; // api call for 5 day weather forecast
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`; // api call for current weather
  
  const [dailyForecastData, setDailyForecastData] = useState<ForecastDataInterface>();
  const [currentData, setCurrentData] = useState<CurrentDataInterface>(); 
  const [forecastTemperatures, setForecastTemperatures] = useState<number[]>(
    []
  );
  // fetching the data for the current weather usestate  
  useEffect(() => {
    async function FetchCurrentData() {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        setCurrentData(data);
    }
    FetchCurrentData();
  }, [weatherUrl]);

  
  useEffect(() => {
    async function FetchDailyForecastData() {
      const res = await fetch(dailyForecastUrl);
      const data = await res.json();
      console.log(data)
      let date = new Date("");
      const list = data.list 
      data.list = [];
      list.forEach((element : List) => {
        if(date.getDay() != new Date(element.dt_txt).getDay()){
          date = new Date(element.dt_txt)
          data.list.push(element)
        }
      });
      data.list.shift()
      const temps = data.list.map((item: { main: { feels_like: number; }; }) =>
        Math.round(item.main.feels_like as number)
      );
      setDailyForecastData(data);
      setForecastTemperatures(temps);
    }
    FetchDailyForecastData();
  }, [dailyForecastUrl])

  if (!dailyForecastData || !dailyForecastData.list || dailyForecastData.list.length === 0) {
    return <div>No forecast data available</div>;
  }

    // checking if it sucks
    if (!currentData) {
      return <div>No current weather data available ¯\_(ツ)_/¯</div>;
    }

  return(
    <div className="flex justify-center items-center h-screen flex-col text-xl font-bold">
      <DailyForecast
      currentweather={currentData}
      city={dailyForecastData.city.name}
      />
      
      <ForecastContainer
        forecastData = {dailyForecastData}
        temps = {forecastTemperatures}
      />
    </div>
  );
}

export default ForecastPage;
