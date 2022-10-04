import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Expense from "./Expense";
import CurrentPlan from "./CurrentPlan";

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Expense */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Expense />
        </Paper>
      </Grid>
      {/* Recent Track */}
      {/* Recent Work */}
      {/* Recent Plan */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <CurrentPlan />
        </Paper>
      </Grid>
      {/* Recent Cash */}
      {/* Recent Stress */}
    </Grid>
  );
}
