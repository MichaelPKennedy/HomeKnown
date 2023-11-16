import React from "react";

const DemographicsTable = ({ data }) => {
  console.log("in table", data);

  // Filter out id and cityId
  const filteredData = Object.entries(data).filter(
    ([key]) => key !== "id" && key !== "city_id"
  );

  return (
    <>
      <h4>Demographics</h4>
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
    </>
  );
};

export default DemographicsTable;
