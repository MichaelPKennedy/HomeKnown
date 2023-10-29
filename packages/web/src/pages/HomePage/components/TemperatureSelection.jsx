import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartDragData from "chartjs-plugin-dragdata";
import Styles from "./TemperatureSelection.module.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  ChartDragData
);

const TemperatureSelection = ({ data, onDataChange }) => {
  const labels = data?.map((month) => month.month);
  const temperatures = data?.map((month) => month.temp);

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBarUpdate = (datasetIndex, index, value) => {
    const updatedData = [...data];
    updatedData[index].temp = value;
    onDataChange(updatedData);
  };

  return isMounted ? (
    <div className={Styles.chartContainer}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Temperature (°F)",
              data: temperatures,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 100,
              min: -10,
              display: !isMobile,
              ticks: {
                font: {
                  size: 13,
                },
                stepSize: 1,
              },
            },
            x: {
              ticks: {
                font: {
                  size: 13,
                },
              },
            },
          },
          plugins: {
            datalabels: {
              color: "#000000",
              anchor: "end",
              align: "top",
              font: {
                size: 16,
              },
            },
            dragData: {
              round: 0,
              dragX: false,
              onDragEnd: (e, datasetIndex, index, value) =>
                handleBarUpdate(datasetIndex, index, value),
            },
          },
        }}
      />
    </div>
  ) : null;
};

export default TemperatureSelection;
