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
import { Card } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const datalabelsPlugin = {
  id: "datalabelsPlugin",
  afterDatasetsDraw: (chart, args, options) => {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          const rawValue = dataset.data[index];
          const parsedValue = parseFloat(rawValue);
          if (parsedValue === 0) {
            return;
          }
          let displayValue = parsedValue.toFixed(2);
          // If the number is an integer after parsing (e.g., 9.00), display it as an integer
          if (parsedValue === Math.floor(parsedValue)) {
            displayValue = parsedValue.toString();
          }

          // Check for mobile device
          const isMobile = window.innerWidth <= 768;

          // Display logic depending on device type
          if (!isMobile || (isMobile && displayValue.length < 5)) {
            ctx.fillStyle = "black";
            const fontSize = 14;
            ctx.font = `${fontSize}px Arial`;
            const dataString = displayValue;
            const x = element.x;
            const y = element.y - fontSize;
            const textWidth = ctx.measureText(dataString).width;
            ctx.fillText(dataString, x - textWidth / 2, y);
          }
        });
      }
    });
  },
};

// Add plugin to ChartJS instance
ChartJS.register(datalabelsPlugin);

const ReusableChartComponent = ({
  data,
  label,
  startYear,
  endYear,
  dataType,
}) => {
  const [selectedYear, setSelectedYear] = useState(2022);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [chartType, setChartType] = useState("temperature");

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

  const filteredData = (data, selectedYear, dataType) => {
    if (dataType === "weather") {
      return transformWeatherData(data, selectedYear);
    } else if (dataType === "housing") {
      return transformHousingData(data, selectedYear);
    }

    return [];
  };

  const toggleChartType = () => {
    setChartType(chartType === "temperature" ? "precipitation" : "temperature");
  };

  const chartFilteredData = filteredData(
    data,
    selectedYear,
    dataType,
    isMobile
  );

  const options = {
    scales: {
      y: {
        type: "linear",
        display: chartType === "temperature",
        suggestedMax:
          Math.max(...chartFilteredData.map((item) => item.maxTemp)) * 1.05,
        position: "left",
        title: {
          display: false,
          text: "Temperature (°F)",
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
        },
      },
      y1: {
        type: "linear",
        display: chartType === "precipitation",
        position: "left",
        title: {
          display: false,
          text: "Precipitation (inches)",
        },
        ticks: {
          font: {
            size: 14,
          },
          callback: function (value) {
            return Math.round(Number(value) * 100) / 100;
          },
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
        },
      },
      datalabelsPlugin: {},
      datalabels: {
        display: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const datasets =
    chartType === "temperature"
      ? [
          {
            type: "line",
            label: "Average Temperature (°F)",
            data: chartFilteredData.map((item) => item.avgTemp),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.1,
            yAxisID: "y",
          },
          {
            type: "line",
            label: "Max Temperature (°F)",
            data: chartFilteredData.map((item) => item.maxTemp),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
            tension: 0.1,
            yAxisID: "y",
          },
          {
            type: "line",
            label: "Min Temperature (°F)",
            data: chartFilteredData.map((item) => item.minTemp),
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
            tension: 0.1,
            yAxisID: "y",
          },
        ]
      : [
          {
            type: "bar",
            label: "Snow (inches)",
            data: chartFilteredData.map((item) => item.snow),
            borderColor: "rgb(201, 203, 207)",
            backgroundColor: "rgba(201, 203, 207, 0.5)",
            yAxisID: "y1",
          },
          {
            type: "bar",
            label: "Rain (inches)",
            data: chartFilteredData.map((item) => item.rain),
            borderColor: "rgb(75, 192, 75)",
            backgroundColor: "rgba(75, 192, 75, 0.5)",
            yAxisID: "y1",
          },
        ];

  const chartData = {
    labels: chartFilteredData.map((item) => item.label),
    datasets: datasets,
  };

  return (
    <Card className={styles.card}>
      <Card.Header>
        <h4>Weather</h4>
      </Card.Header>
      <div className={styles.housingChartContainer}>
        <div className={styles.buttonContainer}>
          <button className={styles.btnDropdown} onClick={toggleChartType}>
            {chartType === "temperature"
              ? "Show Precipitation"
              : "Show Temperature"}
          </button>
          <select
            className={`form-select form-select-lg ${styles.btnDropdown}`}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
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
        </div>

        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default ReusableChartComponent;
