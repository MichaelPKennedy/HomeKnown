import React from "react";
import styles from "./DataSources.module.css"; // Ensure you create this CSS module

const DataSources = () => {
  return (
    <div className={styles.dataSourcesContainer}>
      <h1 className={styles.heading}>Our Data Sources</h1>

      <ul className={styles.sourceList}>
        <li>
          <strong>Weather:</strong>{" "}
          <a href="https://www.ncei.noaa.gov/data/climate-at-a-glance/access/monthly/">
            NOAA Climate Data
          </a>
          ,{" "}
          <a href="https://www.ncei.noaa.gov/access/monitoring/daily-snow/">
            NOAA Daily Snow Data
          </a>
        </li>
        <li>
          <strong>Housing:</strong>{" "}
          <a href="https://www.zillow.com/research/data/">
            Zillow Research Data
          </a>
        </li>
        <li>
          <strong>Cost of Living:</strong>{" "}
          <a href="https://worldpopulationreview.com/state-rankings/cost-of-living-index-by-state">
            World Population Review
          </a>
        </li>
        <li>
          <strong>Recreation:</strong>{" "}
          <a href="https://catalog.data.gov/dataset/tiger-line-shapefile-2019-series-information-for-the-point-landmark-state-based-shapefile">
            Data.gov TIGER/Line Shapefile
          </a>
        </li>
        <li>
          <strong>Scenery:</strong>{" "}
          <a href="https://catalog.data.gov/dataset/tiger-line-shapefile-2019-series-information-for-the-point-landmark-state-based-shapefile">
            Data.gov TIGER/Line Shapefile
          </a>
        </li>
        <li>
          <strong>Salary/Job:</strong>{" "}
          <a href="https://www.bls.gov/oes/current/county_links.htm">
            BLS Occupational Employment and Wage Statistics
          </a>
          , <a href="https://www.bls.gov/oes/tables.htm">BLS Tables</a>
        </li>
        <li>
          <strong>Public Services:</strong>{" "}
          <a href="https://catalog.data.gov/dataset/tiger-line-shapefile-2019-series-information-for-the-point-landmark-state-based-shapefile">
            Data.gov TIGER/Line Shapefile
          </a>
        </li>
        <li>
          <strong>Crime Rate:</strong>{" "}
          <a href="https://ucr.fbi.gov/crime-in-the-u.s/2019/crime-in-the-u.s.-2019/tables/table-8/table-8.xls/view">
            FBI Crime Data
          </a>
        </li>
        <li>
          <strong>Air Quality:</strong>{" "}
          <a href="https://www.epa.gov/air-trends/air-quality-cities-and-counties">
            EPA Air Quality Data
          </a>
        </li>
        <li>
          <strong>Demographics:</strong>{" "}
          <a href="https://public.opendatasoft.com/explore/dataset/us-cities-demographics/table/?flg=en-us">
            OpenDataSoft US Cities Demographics
          </a>
        </li>
        <li>
          <strong>Population:</strong>{" "}
          <a href="https://www.census.gov/data/tables/time-series/demo/popest/2020s-total-cities-and-towns.html">
            US Census Population Data
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DataSources;
