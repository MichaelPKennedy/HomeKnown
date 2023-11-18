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

const ReusablePriceChartComponent = ({ housingData, rentData }) => {
  const [dataType, setDataType] = useState("homePrice");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const data = dataType === "homePrice" ? housingData[0] : rentData[0];
    const monthlyData = {};
    const yearlyAverages = {};
    let mostRecentValue = null;
    let mostRecentLabel = "";

    // Process each entry in the data
    Object.entries(data).forEach(([key, value]) => {
      const [month, year] = key.split("_");
      if (!monthlyData[year]) {
        monthlyData[year] = [];
      }
      if (value !== null) {
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
          monthlyData[year].push(floatValue);

          // Check if this is the most recent value
          if (
            !mostRecentValue ||
            year > mostRecentLabel ||
            (year === mostRecentLabel &&
              month.localeCompare(mostRecentLabel.split("_")[0]) > 0)
          ) {
            mostRecentValue = floatValue;
            mostRecentLabel = key;
          }
        }
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
      chartLabels.push(mostRecentLabel);
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
  }, [housingData, rentData, dataType, selectedYear, windowWidth]);

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        right: 30,
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
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: calculateStepSize(chartData?.datasets?.[0]?.data, 5),
          callback: function (value, index, values) {
            if (value >= 1000) {
              return Math.round(value / 1000) + "k";
            }
            return value;
          },
        },
      },
    },
  };

  function calculateStepSize(data, desiredSteps) {
    if (!data || data.length === 0) {
      return 1;
    }
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const dataRange = maxVal - minVal;

    const stepSize = Math.ceil(dataRange / desiredSteps);

    return Math.max(stepSize, 1);
  }

  return (
    <Card className={styles.card}>
      <Card.Header>
        <h4>{dataType === "homePrice" ? "Home" : "Rent"} Prices</h4>
      </Card.Header>
      <div className={styles.housingChartContainer}>
        <div className={styles.buttonContainer}>
          <select
            onChange={handleDataTypeChange}
            className={styles.btnDropdown}
          >
            <option value="homePrice">Home Price</option>
            <option value="rentPrice">Rent Price</option>
          </select>
        </div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default ReusablePriceChartComponent;
