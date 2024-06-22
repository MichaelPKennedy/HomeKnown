import React from "react";
import { Bar } from "react-chartjs-2";

const CostOfLiving = ({ costOfLiving }) => {
  const { state, nationalAverages } = costOfLiving;
  const stateValues = [
    parseFloat(state.GroceryCostsIndex),
    parseFloat(state.HealthCostsIndex),
    parseFloat(state.HousingCostsIndex),
    parseFloat(state.MiscCostsIndex),
    parseFloat(state.TranspCostsIndex),
    parseFloat(state.UtilCostsIndex),
  ];

  const nationalValues = [
    parseFloat(nationalAverages.avgGroceryCostsIndex),
    parseFloat(nationalAverages.avgHealthCostsIndex),
    parseFloat(nationalAverages.avgHousingCostsIndex),
    parseFloat(nationalAverages.avgMiscCostsIndex),
    parseFloat(nationalAverages.avgTranspCostsIndex),
    parseFloat(nationalAverages.avgUtilCostsIndex),
  ];

  const chartOptions = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
      },
    },
  };

  const chartData = {
    labels: [
      "Grocery",
      "Health",
      "Housing",
      "Misc",
      "Transportation",
      "Utility",
    ],
    datasets: [
      {
        label: "State",
        data: stateValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "National Average",
        data: nationalValues,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>{state.state} Cost of Living Index</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CostOfLiving;
