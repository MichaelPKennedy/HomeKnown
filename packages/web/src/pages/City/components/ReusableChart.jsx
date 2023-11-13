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
      value: Math.round(item.avg_temp),
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
      // Add logic for yearly data transformation for both weather and housing
    } else if (viewType === "monthly") {
      // Handle monthly data
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
        label: label,
        data: chartFilteredData.map((item) => item.value),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
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
      <div styles={{ width: "100%" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ReusableChartComponent;
