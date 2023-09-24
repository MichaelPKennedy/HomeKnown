import React from "react";
import styles from "./ResultsPage.module.css";
import SalaryChart from "./components/SalaryChart";
import SalaryTable from "./components/SalaryTable";
import { useLocation } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  const jobResponseData = location.state?.data;

  if (!jobResponseData) {
    return <p className={styles.errorMessage}>Invalid data!</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <SalaryChart data={jobResponseData} />
      </div>
      <div className={styles.table}>
        <SalaryTable data={jobResponseData} />
      </div>
    </div>
  );
}

export default ResultsPage;
