import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../ResultsPage.module.css";

function SalaryChart({ data }) {
  const { topStates, nationalAverage } = data;
  const svgRef = useRef();

  const svgWidth = 1200;
  const svgHeight = 300;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(topStates.map((row) => row.State.state))
      .range([0, svgWidth])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(topStates, (row) => parseFloat(row.avg_salary))])
      .range([svgHeight - 50, 30]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Bars
    svg
      .selectAll(".bar")
      .data(topStates)
      .join("rect")
      .attr("class", "bar")
      .style("transform", `scale(1, -1)`)
      .attr("x", (row) => xScale(row.State.state))
      .attr("y", -(svgHeight - 50)) // Start bars from the bottom
      .attr("width", xScale.bandwidth())
      .transition()
      .duration(400)
      .attr(
        "height",
        (row) => svgHeight - 50 - yScale(parseFloat(row.avg_salary))
      )
      .attr("fill", (row) => colorScale(row.State.state));

    // Axes
    const xAxis = d3.axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${svgHeight - 50}px)`)
      .call(xAxis); // Adjusted x-axis position

    const yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    // Data Labels
    svg
      .selectAll(".label")
      .data(topStates)
      .join("text")
      .attr("class", "label")
      .text((row) => `$${parseFloat(row.avg_salary).toFixed(2)}`)
      .attr("x", (row) => xScale(row.State.state) + xScale.bandwidth() / 2)
      .attr("y", (row) => yScale(parseFloat(row.avg_salary)) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

    // National Average Salary Line
    const avgSalaryYPosition = yScale(nationalAverage.salary); // get the y-coordinate for the average salary

    svg
      .selectAll(".average-line")
      .data([nationalAverage.salary]) // bind the average salary data
      .join("line")
      .attr("class", "average-line")
      .attr("x1", 0)
      .attr("x2", svgWidth - 100)
      .attr("y1", avgSalaryYPosition)
      .attr("y2", avgSalaryYPosition)
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4 4"); // this makes the line dashed

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
  }, [topStates, nationalAverage]);

  return (
    <div className={styles.chartContainer}>
      <svg ref={svgRef} width={svgWidth} height={svgHeight}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

export default SalaryChart;
