import React, { useState, useEffect } from "react";
import client from "../../../feathersClient";
import styles from "../City.module.css";
import { Card, Table } from "react-bootstrap";

const WeatherForecast = (city) => {
  const [weatherData, setWeatherData] = useState(null);

  const { latitude, longitude } = city;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client
          .service("forecast")
          .find({ query: { latitude, longitude } });
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={styles.card}>
      <Card.Header>
        <h4>Weather Right Now</h4>
      </Card.Header>
      <p style={{ fontSize: "150px" }} className="mb-0">
        {getWeatherIcon(weatherData?.weather?.[0]?.main)}{" "}
      </p>
      <Table responsive="sm">
        <tbody>
          <tr>
            <td>
              <p>{weatherData?.weather?.[0]?.main}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Temperature: {weatherData?.main.temp}°F</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Humidity: {weatherData?.main.humidity}%</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Wind Speed: {weatherData?.wind.speed} m/s</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default WeatherForecast;
