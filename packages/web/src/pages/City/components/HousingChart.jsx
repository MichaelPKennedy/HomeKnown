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

const ReusablePriceChartComponent = ({ housingData, rentData }) => {
  const [viewType, setViewType] = useState("monthly");
  const [dataType, setDataType] = useState("homePrice");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();

  useEffect(() => {
    const data = dataType === "homePrice" ? housingData[0] : rentData[0];

    // Extract and sort the years from the data
    const years = Object.keys(data)
      .filter((key) => key.includes("_"))
      .map((key) => parseInt(key.split("_")[1], 10))
      .filter((year) => !isNaN(year))
      .sort();

    if (years.length > 0) {
      setStartYear(years[0]);
      setEndYear(years[years.length - 1]);
    }

    const newChartData = {
      labels: [],
      datasets: [
        {
          label: `${dataType === "homePrice" ? "Home" : "Rent"} Price`,
          data: [],
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    };

    if (viewType === "monthly") {
      Object.entries(data).forEach(([key, value]) => {
        const [month, year] = key.split("_");
        if (year === selectedYear.toString()) {
          newChartData.labels.push(
            month.charAt(0).toUpperCase() + month.slice(1)
          );
          if (value !== null) {
            newChartData.datasets[0].data.push(parseFloat(value));
          }
        }
      });
    } else {
      // yearly
      const filteredYearsWithData = Object.keys(data)
        .filter((key) => key.includes("_"))
        .reduce((acc, key) => {
          const [month, year] = key.split("_");
          const value = parseFloat(data[key]);
          if (!isNaN(value) && value !== 0) {
            if (!acc[year]) {
              acc[year] = [];
            }
            acc[year].push({ month, value });
          }
          return acc;
        }, {});

      const yearsWithData = Object.keys(filteredYearsWithData).sort(
        (a, b) => a - b
      );

      const chartLabels = yearsWithData;
      const chartValues = yearsWithData.map((year) => {
        const yearData = filteredYearsWithData[year];
        const decemberData = yearData.find((data) => data.month === "december");
        return decemberData ? decemberData.value : null;
      });

      newChartData.labels = chartLabels;
      newChartData.datasets[0].data = chartValues;
    }

    setChartData(newChartData);
  }, [housingData, rentData, viewType, dataType, selectedYear]);

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: (ctx) => {
          const labels = ctx.chart?.data?.labels;
          const labelStart = labels?.[0];
          const labelEnd = labels?.[labels.length - 1];
          return `${
            dataType === "homePrice" ? "Home" : "Rent"
          } Price Trends for ${labelStart ?? ""} - ${labelEnd ?? ""}`;
        },
      },
      tooltip: {
        position: "nearest",
        mode: "index",
        intersect: false,
      },
      legend: {
        display: true,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: viewType === "monthly" ? "Month" : "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h4>{dataType === "homePrice" ? "Home" : "Rent"} Prices</h4>
      <div className={styles.chartContainer}>
        <select onChange={handleViewTypeChange} className={styles.btnDropdown}>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <select onChange={handleDataTypeChange} className={styles.btnDropdown}>
          <option value="homePrice">Home Price</option>
          <option value="rentPrice">Rent Price</option>
        </select>
        {viewType === "monthly" && (
          <select
            className={styles.btnDropdown}
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
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default ReusablePriceChartComponent;
