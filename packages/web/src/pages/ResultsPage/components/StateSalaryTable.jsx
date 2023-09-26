import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function SalaryTable({ data }) {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell align="right">Average Salary</TableCell>
            <TableCell align="right">Average Hourly Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.topStates.map((row) => (
            <TableRow key={row.state_code}>
              <TableCell>{row.State.state}</TableCell>
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

export default SalaryTable;
