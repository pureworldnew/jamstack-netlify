import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as myConstants from "consts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import WeeklyChart from "./WeeklyChart";
import Expense from "./Expense";
import CurrentPlan from "./CurrentPlan";

export default function Dashboard() {
   const [chart, setChart] = React.useState(myConstants.CHART_OPTIONS[0].value);
   const handleChartOption = (e) => {
      console.log(e.target.value);
      setChart(e.target.value);
   };
   const generateSelectOptions = () =>
      myConstants.CHART_OPTIONS.map((option) => (
         <MenuItem key={option.value} value={option.value}>
            {option.label}
         </MenuItem>
      ));
   return (
      <Grid container spacing={3}>
         {/* Recent Plan */}
         <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
               <CurrentPlan />
            </Paper>
         </Grid>
         {/* Recent Track */}
         <Grid container item xs={12} sx={{ flexDirection: "row-reverse" }}>
            <Grid item>
               <Select
                  id="chartSelect"
                  labelId="chart-label"
                  value={chart}
                  onChange={handleChartOption}
                  autoWidth
                  label="Chart Option"
               >
                  {generateSelectOptions()}
               </Select>
            </Grid>
         </Grid>
         <Grid item xs={12}>
            <Paper
               sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 440,
               }}
            >
               <WeeklyChart chartType={chart} />
            </Paper>
         </Grid>
         {/* Recent Job */}
         <Grid item xs={12} />
         {/* Recent Expense */}
         <Grid item xs={12}>
            <Paper
               sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 440,
               }}
            >
               <Expense />
            </Paper>
         </Grid>

         {/* Recent Cash */}
         {/* Recent Stress */}
      </Grid>
   );
}
