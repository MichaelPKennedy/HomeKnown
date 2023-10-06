import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "../ResultsPage.module.css";

const months = [
  { abbrev: "jan", full: "January" },
  { abbrev: "feb", full: "February" },
  { abbrev: "mar", full: "March" },
  { abbrev: "apr", full: "April" },
  { abbrev: "may", full: "May" },
  { abbrev: "jun", full: "June" },
  { abbrev: "jul", full: "July" },
  { abbrev: "aug", full: "August" },
  { abbrev: "sep", full: "September" },
  { abbrev: "oct", full: "October" },
  { abbrev: "nov", full: "November" },
  { abbrev: "dec", full: "December" },
];

const legendData = [
  { color: "red", label: "High Temp" },
  { color: "blue", label: "Low Temp" },
  { color: "lightblue", label: "Snow" },
  { color: "darkBlue", label: "Rain" },
];

const CityWeatherGraph = ({ cityData }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  const weatherData = months.map((month) => ({
    high: Number(cityData[`${month.abbrev}_high`]),
    low: Number(cityData[`${month.abbrev}_low`]),
    snow: Number(cityData[`${month.abbrev}_snow`]),
    rain: Number(cityData[`${month.abbrev}_prec`]),
  }));

  useEffect(() => {
    if (!cityData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Clear previous SVG content
    svg.selectAll("*").remove();

    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 50, bottom: 40, left: 50 };

    const highTemps = months.map(
      (month) => Number(cityData[`${month.abbrev}_high`]) || 0
    );
    const lowTemps = months.map(
      (month) => Number(cityData[`${month.abbrev}_low`]) || 0
    );

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin.right - 125}, 0)`);

    // Scales
    const maxY = Math.max(
      ...weatherData.map((d) => d.high),
      ...weatherData.map((d) => d.snow),
      ...weatherData.map((d) => d.rain)
    );
    const minY = Math.min(
      ...weatherData.map((d) => d.low),
      ...weatherData.map((d) => d.snow),
      ...weatherData.map((d) => d.rain)
    );

    const barWidth = (width - margin.left - margin.right) / 24;

    const yScale = d3
      .scaleLinear()
      .domain([minY, maxY])
      .range([height - margin.bottom, margin.top]);

    const xScaleBars = d3
      .scaleLinear()
      .domain([0.5, 12.5])
      .range([margin.left, width - margin.right]);

    const xScaleLines = d3
      .scaleLinear()
      .domain([1, 12])
      .range([margin.left, width - margin.right]);

    // X & Y axis

    const xAxis = d3
      .axisBottom(xScaleLines)
      .tickFormat((d) => months[d - 1].full)
      .tickValues(d3.range(1, 13));
    const yAxis = d3.axisLeft(yScale);

    // Line generators
    const lineHigh = d3
      .line()
      .x((d, i) => xScaleLines(i + 1))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    const lineLow = d3
      .line()
      .x((d, i) => xScaleLines(i + 1))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    // Add high temperature line
    svg
      .append("path")
      .datum(highTemps)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", lineHigh);

    // Add low temperature line
    svg
      .append("path")
      .datum(lowTemps)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", lineLow);

    const yScalePrecipitation = d3
      .scaleLinear()
      .domain([0, 20])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll(".bar-snow")
      .data(weatherData)
      .enter()
      .append("rect")
      .attr("class", "bar-snow")
      .attr("x", (d, i) => xScaleBars(i + 1) - barWidth)
      .attr("y", (d) => yScalePrecipitation(d.snow))
      .attr("width", barWidth)
      .attr(
        "height",
        (d) => height - margin.bottom - yScalePrecipitation(d.snow)
      )
      .attr("fill", "lightblue");

    svg
      .selectAll(".bar-rain")
      .data(weatherData)
      .enter()
      .append("rect")
      .attr("class", "bar-rain")
      .attr("x", (d, i) => xScaleBars(i + 1))
      .attr("y", (d) => yScalePrecipitation(d.rain))
      .attr("width", barWidth)
      .attr(
        "height",
        (d) => height - margin.bottom - yScalePrecipitation(d.rain)
      )
      .attr("fill", "darkBlue");

    // X & Y axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    const yAxisRight = d3.axisRight(yScalePrecipitation);
    svg
      .append("g")
      .attr("transform", `translate(${width - margin.right}, 0)`)
      .call(yAxisRight);

    legend
      .selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 25)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (d) => d.color);

    legend
      .selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 30) // Position text to the right of the colored square
      .attr("y", (d, i) => i * 25 + 15) // Center text vertically in the colored square
      .text((d) => d.label);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", styles.tooltip)
      .style("opacity", 0);

    const focusHigh = svg
      .append("g")
      .attr("class", styles.focus)
      .style("display", "none");

    const focusLow = svg
      .append("g")
      .attr("class", styles.focus)
      .style("display", "none");

    focusHigh.append("circle").attr("r", 4.5).attr("fill", "red");
    focusLow.append("circle").attr("r", 4.5).attr("fill", "blue");

    svg
      .append("rect")
      .attr("class", styles.overlay)
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        focusHigh.style("display", null);
        focusLow.style("display", null);
      })
      .on("mouseout", () => {
        focusHigh.style("display", "none");
        focusLow.style("display", "none");
        tooltip.style("opacity", 0);
      })
      .on("mousemove", mousemove);

    function mousemove(event) {
      const x0 = xScaleLines.invert(d3.pointer(event)[0]);
      const i = Math.round(x0) - 1; // Adjusting index to match our data array
      const d = weatherData[i];
      focusHigh.attr(
        "transform",
        `translate(${xScaleLines(i + 1)}, ${yScale(d.high)})`
      );
      focusLow.attr(
        "transform",
        `translate(${xScaleLines(i + 1)}, ${yScale(d.low)})`
      );
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(`${months[i].full}<br/>High: ${d.high}°F<br/>Low: ${d.low}°F`)
        .style("left", event.pageX + 5 + "px")
        .style("top", event.pageY - 28 + "px");

      const lineAvg = d3
        .line()
        .x((d, i) => xScaleLines(i + 1))
        .y(() => yScale(cityData.estimatedYearlyAvgTemp))
        .curve(d3.curveMonotoneX);

      // Add average yearly temperature line
      svg
        .append("path")
        .datum(months) // We're using the months array just to get the x-values; y-values are constant
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-dasharray", "4 4") // This makes the line dashed
        .attr("stroke-width", 1)
        .attr("d", lineAvg);
    }
    return () => {
      tooltip.remove();
    };
  }, [cityData]);

  return (
    <div className={styles.graphContainer}>
      <h3>
        {cityData.city}, {cityData.state}
      </h3>
      <svg
        ref={svgRef}
        width="100%"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
      ></svg>

      <div ref={tooltipRef} className={styles.tooltip}></div>
    </div>
  );
};

export default CityWeatherGraph;
