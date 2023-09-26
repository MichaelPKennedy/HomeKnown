import React from "react";
import styles from "./ResultsPage.module.css";
import StateSalaryChart from "./components/StateSalaryChart";
import StateSalaryTable from "./components/StateSalaryTable";
import CitySalaryChart from "./components/CitySalaryChart";
import CitySalaryTable from "./components/CitySalaryTable";
import { useLocation } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  const jobResponseData = location.state?.data;
  console.log("jobResponseData", jobResponseData);
  const { jobs } = jobResponseData;
  if (!jobResponseData) {
    return <p className={styles.errorMessage}>Invalid data!</p>;
  }

  return (
    <div>
      <h4 className={` pt-5 pl-5 ${styles.title}`}>{jobs}</h4>
      <div className={styles.container}>
        <h5 className="pb-4 pt-2">Top States</h5>
        <div className={styles.chart}>
          <StateSalaryChart data={jobResponseData} />
        </div>
        <div className={styles.table}>
          <StateSalaryTable data={jobResponseData} />
        </div>
        <h5 className={` pb-4 ${styles.title}`}>Top Cities/Areas</h5>
        <div className={styles.chart}>
          <CitySalaryChart data={jobResponseData} />
        </div>
        <div className={styles.table}>
          <CitySalaryTable data={jobResponseData} />
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
