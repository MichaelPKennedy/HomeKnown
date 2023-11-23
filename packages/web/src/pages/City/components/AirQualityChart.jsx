import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "../City.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AirQualityChart = ({ airQualityData }) => {
  const chartData = {
    labels: [
      "CO",
      "Pb",
      "NO2 AM",
      "NO2 1hr",
      "O3",
      "PM10 24hr",
      "PM2.5 AM",
      "PM2.5 24hr",
      "SO2 1hr",
    ],
    datasets: [
      {
        label: "Concentration",
        data: [
          airQualityData.CO_8hr_ppm || 0,
          airQualityData.Pb_3mo_ug_m3 || 0,
          airQualityData.NO2_AM_ppb || 0,
          airQualityData.NO2_1hr_ppb || 0,
          airQualityData.O3_8hr_ppm || 0,
          airQualityData.PM10_24hr_ug_m3 || 0,
          airQualityData.PM2_5_Wtd_AM_ug_m3 || 0,
          airQualityData.PM2_5_24hr_ug_m3 || 0,
          airQualityData.SO2_1hr_ppb || 0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pollutantInfo = {
    CO: "Carbon Monoxide: A gas that can be harmful in high amounts. Measured over 8 hours.",
    Pb: "Lead: A toxic metal. Measured over 3 months.",
    "NO2 AM":
      "Nitrogen Dioxide (Yearly Average): A gas from vehicles and power plants.",
    "NO2 1hr": "Nitrogen Dioxide (1-Hour Max): Short-term exposure level.",
    O3: "Ozone: A gas that can irritate the lungs. Measured over 8 hours.",
    "PM10 24hr":
      "Particulate Matter (10 micrometers): Dust and dirt in the air. Measured over 24 hours.",
    "PM2.5 AM":
      "Fine Particulate Matter (2.5 micrometers): Tiny particles from smoke and haze. Yearly average.",
    "PM2.5 24hr":
      "Fine Particulate Matter (2.5 micrometers): Measured over 24 hours.",
    "SO2 1hr":
      "Sulfur Dioxide: A gas from burning fossil fuels. Measured over 1 hour.",
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        afterDataLimits: (axis) => {
          let maxDataValue = Math.max(
            ...chartData.datasets.flatMap((dataset) => dataset.data)
          );
          axis.max = Math.max(500, maxDataValue * 1.1);
        },
        title: {
          display: false,
          text: "Concentration",
        },
        ticks: {
          maxRotation: 0,
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
        },
      },
    },
    maintainAspectRatio: false,

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            const additionalInfo = pollutantInfo[context.label];
            if (additionalInfo) {
              const words = additionalInfo.split(" ");
              const lines = [];
              let currentLine = words[0];

              for (let i = 1; i < words.length; i++) {
                const word = words[i];
                const length = currentLine.length + word.length + 1;
                if (length < 30) {
                  currentLine += " " + word;
                } else {
                  lines.push(currentLine);
                  currentLine = word;
                }
              }
              lines.push(currentLine);
              return [label].concat(lines);
            }
            return label;
          },
        },
        displayColors: false,
        boxWidth: 10,
        titleSpacing: 6,
      },
      legend: {
        display: true,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Card className={styles.card}>
      <Card.Header>
        <h4>Air Pollutants</h4>
      </Card.Header>
      <div className={styles.airContainer}>
        <Bar data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default AirQualityChart;
