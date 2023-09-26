import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function CitySalaryTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell> {/* New header */}
            <TableCell align="right">Average Salary</TableCell>
            <TableCell align="right">Average Hourly Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.topCities.map((row) => (
            <TableRow key={row.area_code}>
              <TableCell>{row.Area.area_title}</TableCell>
              <TableCell>{row.Area.State.state}</TableCell>{" "}
              {/* New cell for state */}
              <TableCell align="right">
                ${parseFloat(row.avg_salary).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                ${parseFloat(row.avg_hourly).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CitySalaryTable;
