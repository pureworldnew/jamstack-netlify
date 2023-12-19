import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as myConstants from "consts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Title } from "components/title";
import Plan from "feature/plan/Plan";
import WeeklyChart from "./WeeklyChart";
// import Expense from "./Expense";

export default function Dashboard() {
   const [chart, setChart] = React.useState(myConstants.CHART_OPTIONS[1].value);
   const [totalJob, setTotalJob] = React.useState("");
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
               <Plan current />
            </Paper>
         </Grid>
         {/* Recent Track */}
         <Grid
            container
            item
            xs={12}
            alignItems="center"
            flexDirection="row-reverse"
            spacing={3}
         >
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
            <Grid item>
               {chart === "total_track" ? (
                  <Title>{`Weekly total: ${totalJob}`}</Title>
               ) : (
                  ""
               )}
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
               <WeeklyChart chartType={chart} setTotalJob={setTotalJob} />
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
               {/* <Expense /> */}
            </Paper>
         </Grid>

         {/* Recent Cash */}
         {/* Recent Stress */}
      </Grid>
   );
}
