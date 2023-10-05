// components/StateGraph.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import styles from "../ResultsPage.module.css";
const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const StateGraph = ({ stateData, stateAvg, stateName }) => {
  const svgRef = useRef(null);
  const margin = { top: 20, right: 50, bottom: 40, left: 50 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();
    if (!stateData || !svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X scale (months)
    const xScale = d3.scaleLinear().domain([1, 12]).range([0, width]);

    // Y scale (temperature)
    const yDomain = [
      d3.min(Object.values(stateData.monthlyAvg)),
      d3.max(Object.values(stateData.monthlyAvg)),
    ];
    const yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);

    // X & Y axis
    const xAxis = d3.axisBottom(xScale).tickFormat((d) => monthNames[d]);

    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("class", styles.axis)
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", styles.axis).call(yAxis);

    // Draw the line
    const line = d3
      .line()
      .x((d) => xScale(d.month))
      .y((d) => yScale(d.temp))
      .curve(d3.curveBasis);

    const pathData = Object.entries(stateData.monthlyAvg).map(
      ([month, temp]) => ({ month: +month, temp: +temp })
    );
    svg
      .append("path")
      .attr("class", styles.linePath)
      .datum(pathData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .append("line")
      .attr("class", styles.avgLine)
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", yScale(+stateAvg))
      .attr("y2", yScale(+stateAvg))
      .attr("stroke", "red")
      .attr("stroke-dasharray", "4");

    svg
      .append("text")
      .attr("class", styles.avgText)
      .attr("x", 5)
      .attr("y", yScale(+stateAvg) - 5)
      .text(`Yearly Avg: ${stateAvg}°F`)
      .attr("font-size", "10px")
      .attr("fill", "red");

    // State Name
    svg
      .append("text")
      .attr("class", styles.graphTitle)
      .attr("x", width / 2)
      .text(stateName)
      .attr("font-size", "14px")
      .attr("text-anchor", "middle");

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", styles.tooltip)
      .style("opacity", 0);

    const focus = svg
      .append("g")
      .attr("class", styles.focus)
      .style("display", "none");

    focus.append("circle").attr("r", 4.5);

    svg
      .append("rect")
      .attr("class", styles.overlay)
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => {
        focus.style("display", "none");
        tooltip.style("opacity", 0);
      })
      .on("mousemove", mousemove);

    function mousemove(event) {
      const x0 = xScale.invert(d3.pointer(event)[0]);
      const i = Math.round(x0);
      const d = pathData[i - 1];
      focus.attr(
        "transform",
        `translate(${xScale(d.month)}, ${yScale(d.temp)})`
      );
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(`${monthNames[d.month]}: ${d.temp}°F`)
        .style("left", event.pageX + 5 + "px")
        .style("top", event.pageY - 28 + "px");
    }
    return () => {
      tooltip.remove();
    };
  }, [stateData, stateAvg, stateName]);

  return (
    <div className={styles.graphContainer}>
      <svg
        ref={svgRef}
        width="100%"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
      ></svg>
    </div>
  );
};

export default StateGraph;
