import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "../City.module.css";
import { Card } from "react-bootstrap";
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

const ReusablePriceChartComponent = ({ housingData = [], rentData = [] }) => {
  let defaultType = "homePrice";
  if (housingData?.length > 0) {
    defaultType = "homePrice";
  } else if (rentData?.length > 0) {
    defaultType = "rentPrice";
  }
  const [dataType, setDataType] = useState(defaultType);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mostRecentPrice, setMostRecentPrice] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const data = dataType === "homePrice" ? housingData?.[0] : rentData?.[0];
    if (!data) {
      setChartData({ labels: [], datasets: [] });
      setMostRecentPrice(null);
      return;
    }

    // Sort the keys (month_year) in descending order to process the most recent first
    const sortedKeys = Object.keys(data).sort((a, b) => b.localeCompare(a));

    let mostRecentValue = null;
    let mostRecentLabel = "";

    const monthlyData = {};
    const yearlyAverages = {};

    sortedKeys.forEach((key) => {
      const [month, year] = key.split("_");
      const value = data[key];

      // Continue if value is null
      if (value === null) return;

      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        if (!mostRecentValue) {
          mostRecentValue = floatValue;
          mostRecentLabel = key;
        }

        if (!monthlyData[year]) {
          monthlyData[year] = [];
        }
        monthlyData[year].push(floatValue);
      }
    });

    // Calculate yearly averages
    Object.keys(monthlyData).forEach((year) => {
      yearlyAverages[year] =
        monthlyData[year].reduce((acc, val) => acc + val, 0) /
        monthlyData[year].length;
    });

    // Prepare chart data
    const chartLabels = Object.keys(yearlyAverages).sort((a, b) => a - b);
    const chartValues = chartLabels.map((year) =>
      Math.round(yearlyAverages[year])
    );

    // Add the most recent price if it's not included in the yearly averages
    if (mostRecentLabel && !yearlyAverages[mostRecentLabel.split("_")[1]]) {
      chartLabels.push(mostRecentLabel.split("_")[1]);
      chartValues.push(mostRecentValue);
    }

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: `${dataType === "homePrice" ? "Home" : "Rent"} Price (USD)`,
          data: chartValues,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    });

    setMostRecentPrice(
      mostRecentValue
        ? {
            label: mostRecentLabel,
            value: mostRecentValue,
          }
        : null
    );
  }, [housingData, rentData, dataType]);

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        right: windowWidth > 768 ? 30 : 0,
      },
    },
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
          display: false,
          text: "Year",
        },
        ticks: {
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (value >= 100000) {
              return value / 1000 + "k";
            } else {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
        },
      },
    },
  };

  return (
    <Card className={styles.card}>
      <Card.Header>
        <h4>{dataType === "homePrice" ? "Home" : "Rent"} Prices</h4>
      </Card.Header>
      {mostRecentPrice && (
        <div className="mt-4">
          <strong>Current Average Price: </strong>
          {mostRecentPrice.value
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      )}
      <div className={styles.housingChartContainer}>
        <div className={styles.buttonContainer}>
          <select
            onChange={handleDataTypeChange}
            value={dataType}
            className={`form-select ${styles.btnDropdown}`}
          >
            <option value="homePrice">Home Price</option>
            <option value="rentPrice">Rent Price</option>
          </select>
        </div>
        {chartData.datasets.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Card>
  );
};

export default ReusablePriceChartComponent;
