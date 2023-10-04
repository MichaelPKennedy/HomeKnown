// components/TemperatureGraph.js
import React from "react";
import StateTemperatureGraph from "./StateTemperatureGraph";

const TemperatureGraph = ({ data }) => {
  const { graphData, topStates } = data;
  console.log("graphData", graphData);
  console.log("topStates", topStates);
  return (
    <div>
      {topStates.map((state) => {
        const stateGraphData = graphData.find(
          (data) => data.stateCode === state.state_code
        );
        return (
          <StateTemperatureGraph
            key={state.state_code}
            stateData={stateGraphData}
            stateAvg={state.avg_temperature}
            stateName={state.State.state}
          />
        );
      })}
    </div>
  );
};

export default TemperatureGraph;
