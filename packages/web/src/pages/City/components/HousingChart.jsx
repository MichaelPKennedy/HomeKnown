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

    const newChartData = {
      labels: [],
      datasets: [
        {
          label: `${dataType === "homePrice" ? "Home" : "Rent"} Price (USD)`,
          data: [],
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    };

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

    const isMobile = windowWidth <= 768;
    const currentYear = new Date().getFullYear();
    const yearsAgo = currentYear - 8;

    if (isMobile) {
      newChartData.labels = newChartData.labels.filter((label) => {
        const year = parseInt(label, 10);
        return year > yearsAgo;
      });
      newChartData.datasets.forEach((dataset) => {
        dataset.data = dataset.data.slice(-10);
      });
    }

    setChartData(newChartData);
  }, [housingData, rentData, dataType, selectedYear, windowWidth]);

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
