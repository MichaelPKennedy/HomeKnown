import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./TemperatureSelection.module.css";

const TemperatureSelection = ({
  width = 600,
  height = 400,
  data,
  onDataChange,
}) => {
  console.log("Component Rendered: data", data);

  const svgRef = useRef(null);
  const [currentWidth, setCurrentWidth] = useState(width);
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const updateChart = (newWidth) => {
    console.log("Update Chart Called: newWidth", newWidth);

    const svg = d3.select(svgRef.current);
    if (!svg.node()) {
      console.error("SVG not found!");
      return;
    }

    const plotArea = svg.select(`.${styles["plot-area"]}`);
    const xAxisGroup = svg.select(`.${styles["x-axis"]}`);
    const yAxisGroup = svg.select(`.${styles["y-axis"]}`);

    if (!plotArea.node() || !xAxisGroup.node() || !yAxisGroup.node()) {
      console.error("Required groups not found!");
      return;
    }

    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, newWidth - margin.left - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.top - margin.bottom, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.month))
      .y((d) => yScale(d.temp));

    const drag = d3
      .drag()
      .on("start", (event, d) => {
        const tooltip = svg.select(`.${styles.tooltip}`);
        tooltip
          .attr("x", xScale(d.month) + margin.left)
          .attr("y", yScale(d.temp) + margin.top - 30) // 30px above the point
          .text(d.temp.toFixed(1)) // Showing 1 decimal place
          .style("text-anchor", "middle") // Center the text
          .style("visibility", "visible");
      })
      .on("drag", (event, d) => {
        const newY = yScale.invert(event.y - margin.top);
        d.temp = Math.min(100, Math.max(0, newY));
        onDataChange([...data]);
        updateChart(newWidth);

        let tooltipY = yScale(d.temp) + margin.top - 30; // 30px above the point
        if (tooltipY < 15) tooltipY += 60; // If too close to the top, adjust down

        // Update tooltip position and value
        const tooltip = svg.select(`.${styles.tooltip}`);
        tooltip
          .attr("x", xScale(d.month) + margin.left)
          .attr("y", tooltipY)
          .text(d.temp.toFixed(1)) // Showing 1 decimal place
          .style("text-anchor", "middle"); // Center the text
      })
      .on("end", () => {
        // Hide tooltip
        const tooltip = svg.select(`.${styles.tooltip}`);
        tooltip.style("visibility", "hidden");
      });

    const xAxis = d3.axisBottom(xScale);
    xAxisGroup.call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    yAxisGroup.call(yAxis);

    plotArea
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("class", styles.line)
      .attr("d", line);

    const circles = plotArea
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("class", styles.circle)
      .attr("cx", (d) => xScale(d.month))
      .attr("cy", (d) => yScale(d.temp))
      .attr("r", 5)
      .call(drag);

    circles
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).transition().attr("r", 8);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget).transition().attr("r", 5);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = svgRef.current.parentElement.offsetWidth;
      console.log("Resized: newWidth", newWidth);
      setCurrentWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the chart size on first render

    return () => window.removeEventListener("resize", handleResize);
  }, [data, onDataChange]);

  useEffect(() => {
    console.log(
      "Effect for Chart Update: currentWidth, data",
      currentWidth,
      data
    );
    updateChart(currentWidth); // Update chart when width or data changes
  }, [currentWidth, data, onDataChange]);

  return (
    <div
      className={styles.temperatureChart}
      style={{ width: "100%", height: height }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${currentWidth} ${height}`}
      >
        <text
          className={styles.tooltip}
          style={{ visibility: "hidden" }}
        ></text>
        <g
          className={styles["plot-area"]}
          transform={`translate(${margin.left},${margin.top})`}
        />
        <g
          className={`${styles.axis} ${styles["x-axis"]}`}
          transform={`translate(${margin.left},${height - margin.bottom})`}
        />
        <g
          className={`${styles.axis} ${styles["y-axis"]}`}
          transform={`translate(${margin.left},${margin.top})`}
        />
      </svg>
    </div>
  );
};

export default TemperatureSelection;
