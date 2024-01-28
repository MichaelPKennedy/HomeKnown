import React from "react";
import styles from "../City.module.css";
import { Card, Table } from "react-bootstrap";
import { useCityData } from "../../../utils/CityDataContext";

const WeatherForecast = (city) => {
  const { weatherForecast, isForecastLoading, forecastError } = useCityData();

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Snow":
        return "❄️";
      case "Thunderstorm":
        return "⛈️";
      default:
        return "🌈";
    }
  };

  if (isForecastLoading) {
    return <div>Loading...</div>;
  }

  const { currentWeather } = weatherForecast || {};

  return (
    <Card className={styles.card}>
      <Card.Header>
        <h4>Weather Right Now</h4>
      </Card.Header>
      <p style={{ fontSize: "150px" }} className="mb-0">
        {getWeatherIcon(currentWeather?.weather?.[0]?.main)}{" "}
      </p>
      <Table responsive="sm">
        <tbody>
          <tr>
            <td>
              <p>{currentWeather?.weather?.[0]?.main}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Temperature: {currentWeather?.main.temp}°F</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Humidity: {currentWeather?.main.humidity}%</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Wind Speed: {currentWeather?.wind.speed} m/s</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default WeatherForecast;
