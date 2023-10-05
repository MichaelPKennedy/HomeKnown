import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../ResultsPage.module.css";

function CitySalaryChart({ data }) {
  const { topCities, nationalAverage } = data;
  const svgRef = useRef();

  const svgWidth = 1200;
  const svgHeight = 300;
  const margin = { top: 20, right: 30, bottom: 60, left: 50 }; // Defined margins

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Adjusted Scales to consider margins
    const xScale = d3
      .scaleBand()
      .domain(topCities.map((row) => row.Area.area_title))
      .range([margin.left, svgWidth - margin.right])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(topCities, (row) => parseFloat(row.avg_salary))])
      .range([svgHeight - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Bars
    svg
      .selectAll(".bar")
      .data(topCities)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (row) => xScale(row.Area.area_title))
      .attr("y", -(svgHeight - margin.bottom)) // Start bars from the bottom
      .attr("width", xScale.bandwidth())
      .transition()
      .duration(400)
      .attr(
        "height",
        (row) => svgHeight - margin.bottom - yScale(parseFloat(row.avg_salary))
      )
      .attr("fill", (row) => colorScale(row.Area.area_title));

    // Adjusted X & Y axis positions
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0,${svgHeight - margin.bottom})`) // Adjusted x-axis position
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left},0)`) // Adjusted y-axis position
      .call(yAxis);

    // Data Labels
    svg
      .selectAll(".label")
      .data(topCities)
      .join("text")
      .attr("class", "label")
      .text((row) => `$${parseFloat(row.avg_salary).toFixed(2)}`)
      .attr("x", (row) => xScale(row.Area.area_title) + xScale.bandwidth() / 2)
      .attr("y", (row) => yScale(parseFloat(row.avg_salary)) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

    // National Average Salary Line
    const avgSalaryYPosition = yScale(nationalAverage.salary);

    // Adjusted National Average Salary Line coordinates
    svg
      .selectAll(".average-line")
      .data([nationalAverage.salary])
      .join("line")
      .attr("class", "average-line")
      .attr("x1", margin.left)
      .attr("x2", svgWidth - margin.right)
      .attr("y1", avgSalaryYPosition)
      .attr("y2", avgSalaryYPosition)
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4 4");

    // Label for the National Average Salary Line
    svg
      .selectAll(".average-label")
      .data([nationalAverage.salary])
      .join("text")
      .attr("class", "average-label")
      .attr("x", svgWidth - 55)
      .attr("y", 10)
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "middle")
      .text(`National Avg: $${parseFloat(nationalAverage.salary).toFixed(2)}`)
      .attr("font-size", "12px")
      .attr("fill", "red");
  }, [topCities, nationalAverage]);

  return (
    <div className={styles.chartContainer}>
      <svg
        ref={svgRef}
        width="100%"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

export default CitySalaryChart;
