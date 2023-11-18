import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, Button } from "react-bootstrap";
import styles from "./JobData.module.css";

const JobData = ({ jobs }) => {
  const [wageType, setWageType] = useState("hourly");

  const chartOptions = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, ticks) {
            return value >= 1000 ? `${value / 1000}k` : value;
          },
        },
      },
    },
  };
  const createHourlyChartData = (job) => {
    return {
      labels: ["10th %", "25th %", "Median", "75th %", "90th %"],
      datasets: [
        {
          label: "Hourly Wages",
          data: [
            job.h_pct10,
            job.h_pct25,
            job.h_median,
            job.h_pct75,
            job.h_pct90,
          ].map((val) => val || 0),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const createSalaryChartData = (job) => {
    return {
      labels: ["10th %", "25th %", "Median", "75th %", "90th %"],
      datasets: [
        {
          label: "Annual Salaries",
          data: [
            job.a_pct10,
            job.a_pct25,
            job.a_median,
            job.a_pct75,
            job.a_pct90,
          ].map((val) => val || 0),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className={styles.jobDataContainer}>
      {jobs.map((job) => (
        <Card key={job.id} className={styles.jobCard}>
          <Card.Header>
            <h4>Industry</h4>
          </Card.Header>
          <div className={styles.basicInfoContainer}>
            <div className={styles.basicInfoItem}>
              Total Employment: {job.tot_emp}
            </div>
            <div className={styles.basicInfoItem}>
              Average Hourly: ${job.average_hourly}
            </div>
            <div className={styles.basicInfoItem}>
              Average Salary: ${job.average_salary}
            </div>
          </div>
          <div className={styles.toggleButtons}>
            <Button
              onClick={() => setWageType("hourly")}
              active={wageType === "hourly"}
              className={styles.btnDropdown}
            >
              Hourly
            </Button>
            <Button
              onClick={() => setWageType("salary")}
              active={wageType === "salary"}
              className={styles.btnDropdown}
            >
              Salary
            </Button>
          </div>
          <Bar
            data={
              wageType === "hourly"
                ? createHourlyChartData(job)
                : createSalaryChartData(job)
            }
            options={chartOptions}
          />
        </Card>
      ))}
    </div>
  );
};

export default JobData;
