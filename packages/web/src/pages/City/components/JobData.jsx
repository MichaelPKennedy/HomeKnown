import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, Accordion } from "react-bootstrap";
import styles from "./JobData.module.css";

const JobData = ({ jobs }) => {
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
            <strong>Job ID:</strong> {job.id} | <strong>Area Code:</strong>{" "}
            {job.area_code} | <strong>Occ Code:</strong> {job.occ_code}
          </Card.Header>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Basic Info</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Wage Distribution</Accordion.Header>
              <Accordion.Body>
                <Bar
                  data={createHourlyChartData(job)}
                  options={{ maintainAspectRatio: false }}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Salary Progression</Accordion.Header>
              <Accordion.Body>
                <Bar
                  data={createSalaryChartData(job)}
                  options={{ maintainAspectRatio: false }}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};

export default JobData;
