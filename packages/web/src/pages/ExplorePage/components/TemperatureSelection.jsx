import React, { useEffect, useState, useRef } from "react";
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

const temperatureProfiles = {
  "Mild Year Round": [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
  "Full Seasons": [30, 35, 45, 55, 65, 75, 85, 85, 75, 65, 50, 35],
  "Just Cold": [30, 30, 35, 40, 45, 50, 55, 55, 50, 45, 40, 35],
  "Hot Summers, Cold Winters": [30, 35, 50, 60, 70, 90, 95, 95, 80, 65, 50, 35],
  "Constant Chill": [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
  Tropical: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  "Desert Climate": [50, 55, 65, 75, 85, 95, 100, 100, 90, 75, 60, 50],
  "Highland Climate": [40, 40, 45, 50, 55, 60, 65, 65, 60, 55, 45, 40],
};

const TemperatureSelection = ({ data, onDataChange }) => {
  const [chartKey, setChartKey] = useState(0);
  const labels = data?.map((month) => month.month);
  const temperatures = data?.map((month) => month.temp);

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const [selectedProfile, setSelectedProfile] = useState("Custom");

  const handleProfileChange = (event) => {
    const profile = event.target.value;
    setSelectedProfile(profile);
    if (profile !== "Custom") {
      const updatedData = data.map((month, index) => ({
        ...month,
        temp: temperatureProfiles[profile][index],
      }));
      onDataChange(updatedData);
      setChartKey((prevKey) => prevKey + 1); // Update the chart key
    }
  };

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

  const getProfileName = (data) => {
    for (const profileName in temperatureProfiles) {
      const profileTemps = temperatureProfiles[profileName];
      if (data.every((month, index) => month.temp === profileTemps[index])) {
        return profileName;
      }
    }
    return "Custom";
  };

  useEffect(() => {
    // Update the selected profile based on the data prop
    const profileName = getProfileName(data);
    setSelectedProfile(profileName);
  }, [data]);

  const handleBarUpdate = (datasetIndex, index, value) => {
    const updatedData = [...data];
    updatedData[index].temp = value;
    onDataChange(updatedData);
  };

  return isMounted ? (
    <div className={Styles.chartContainer}>
      <div className={`form-group ${Styles.formGroup}`}>
        <label htmlFor="temperatureProfile">Temperature Profile</label>
        <select
          id="temperatureProfile"
          className="form-control"
          value={selectedProfile}
          onChange={handleProfileChange}
        >
          <option value="Custom">Custom</option>
          {Object.keys(temperatureProfiles).map((profile) => (
            <option key={profile} value={profile}>
              {profile}
            </option>
          ))}
        </select>
      </div>
      <Bar
        key={chartKey}
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
          layout: {
            padding: {
              top: 30,
            },
          },
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
              display: false,
            },
            dragData: {
              round: 0,
              dragX: false,
              onDragEnd: (e, datasetIndex, index, value) =>
                handleBarUpdate(datasetIndex, index, value),
            },
            legend: {
              display: false,
              labels: {
                padding: 20,
                boxWidth: 20,
              },
            },
          },
        }}
      />
    </div>
  ) : null;
};

export default TemperatureSelection;
