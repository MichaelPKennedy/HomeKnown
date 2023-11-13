// ReusableChartComponent.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "../City.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReusableChartComponent = ({
  data,
  label,
  startYear,
  endYear,
  dataType,
}) => {
  const [viewType, setViewType] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformWeatherData = (weatherData, selectedYear) => {
    const filteredData = weatherData.filter(
      (item) => Number(item.year) === Number(selectedYear)
    );
    const sortedData = filteredData.sort((a, b) => a.month - b.month);

    return sortedData.map((item) => ({
      label: getMonthName(item.month, isMobile),
      avgTemp: Math.round(item.avg_temp),
      maxTemp: Math.round(item.max_temp),
      minTemp: Math.round(item.min_temp),
      snow: item.snow || 0,
      rain: item.rain || 0,
    }));
  };

  const getMonthName = (monthNumber, short = false) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: short ? "short" : "long" });
  };

  const transformHousingData = (housingDataArray, selectedYear) => {
    const housingData = housingDataArray[0];
    return Object.entries(housingData).reduce((acc, [key, value]) => {
      const [month, year] = key.split("_");
      if (parseInt(year, 10) === selectedYear) {
        acc.push({
          label: getMonthName(parseInt(month, 10)),
          value: parseInt(value).round(),
        });
      }
      return acc;
    }, []);
  };

  const filteredData = (data, viewType, selectedYear, dataType) => {
    if (viewType === "yearly") {
      // Handle yearly data
      let yearlyData = [];
      //TODO: Add logic for yearly data transformation for both weather and housing
    } else if (viewType === "monthly") {
      if (dataType === "weather") {
        return transformWeatherData(data, selectedYear);
      } else if (dataType === "housing") {
        return transformHousingData(data, selectedYear);
      }
    }
    return [];
  };

  const chartFilteredData = filteredData(
    data,
    viewType,
    selectedYear,
    dataType,
    isMobile
  );

  const chartData = {
    labels: chartFilteredData.map((item) => item.label),
    datasets: [
      {
        label: "Average Temperature",
        data: chartFilteredData.map((item) => item.avgTemp),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "Max Temperature",
        data: chartFilteredData.map((item) => item.maxTemp),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Min Temperature",
        data: chartFilteredData.map((item) => item.minTemp),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Snow",
        data: chartFilteredData.map((item) => item.snow),
        fill: false,
        borderColor: "rgb(201, 203, 207)",
      },
      {
        label: "Rain",
        data: chartFilteredData.map((item) => item.rain),
        fill: false,
        borderColor: "rgb(75, 192, 75)",
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <select value={viewType} onChange={(e) => setViewType(e.target.value)}>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
      </select>

      {viewType === "monthly" && (
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Array.from(
            { length: endYear - startYear + 1 },
            (_, i) => startYear + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}

      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default ReusableChartComponent;
