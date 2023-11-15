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

const datalabelsPlugin = {
  id: "datalabelsPlugin",
  afterDatasetsDraw: (chart, args, options) => {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          ctx.fillStyle = "black";
          const fontSize = 14; // or your desired size
          ctx.font = `${fontSize}px Arial`;
          const dataString = dataset.data[index].toString();

          // Calculate the position to draw from
          const x = element.x;
          const y = element.y - fontSize; // Adjust for the height above the point

          // Center the text
          const textWidth = ctx.measureText(dataString).width;
          ctx.fillText(dataString, x - textWidth / 2, y);
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
  const [viewType, setViewType] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(2022);
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

  const maxPrecip =
    Math.ceil(
      Math.max(
        ...chartFilteredData.map((item) => Math.max(item.snow, item.rain))
      ) / 5
    ) * 5;

  const options = {
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Temperature (°C or °F)",
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        max: maxPrecip * 3,
        title: {
          display: true,
          text: "Precipitation (mm or inches)",
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            size: 14,
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

  const chartData = {
    labels: chartFilteredData.map((item) => item.label),
    datasets: [
      {
        type: "line",
        label: "Average Temperature",
        data: chartFilteredData.map((item) => item.avgTemp),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Max Temperature",
        data: chartFilteredData.map((item) => item.maxTemp),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.1,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Min Temperature",
        data: chartFilteredData.map((item) => item.minTemp),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.1,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Snow",
        data: chartFilteredData.map((item) => item.snow),
        borderColor: "rgb(201, 203, 207)",
        backgroundColor: "rgba(201, 203, 207, 0.2)",
        fill: true,
        tension: 0.1,
        yAxisID: "y1",
      },
      {
        type: "line",
        label: "Rain",
        data: chartFilteredData.map((item) => item.rain),
        borderColor: "rgb(75, 192, 75)",
        backgroundColor: "rgba(75, 192, 75, 0.2)",
        fill: true,
        tension: 0.1,
        yAxisID: "y1",
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

      <Line data={chartData} options={options} />
    </div>
  );
};

export default ReusableChartComponent;
