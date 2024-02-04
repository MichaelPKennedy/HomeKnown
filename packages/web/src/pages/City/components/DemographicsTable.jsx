import React from "react";
import { Card } from "react-bootstrap";
import styles from "../City.module.css";

const DemographicsTable = ({ data }) => {
  // Filter out id and cityId
  const filteredData = Object.entries(data).filter(
    ([key]) => key !== "id" && key !== "city_id"
  );

  return (
    <Card className={styles.card}>
      <Card.Header>
        <h4>Demographics</h4>
      </Card.Header>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <tbody>
            {filteredData.map(([key, value]) => (
              <tr key={key}>
                <td style={{ borderRight: "1px solid #dee2e6" }}>
                  {" "}
                  {/* Inline style for vertical line */}
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DemographicsTable;
