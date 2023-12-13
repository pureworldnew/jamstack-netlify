/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import trackApi from "services/track";
import workApi from "services/work";
import { BackDrop } from "components/backdrop";
import * as dayjs from "dayjs";
import * as myConsts from "consts";

import {
   ResponsiveContainer,
   ComposedChart,
   Line,
   Area,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Scatter,
   Legend,
} from "recharts";

function WeeklyChart({ chartType, setTotalJob }) {
   const [loading, setLoading] = useState(false);
   const [graphData, setGraphData] = useState([]);
   const [projectName, setProjectName] = useState([]);

   const parseChartTrackData = async (entryArray) => {
      const chartDataArr = new Array(7);
      const projectNameArr = await trackApi.getProjectName();
      setProjectName(projectNameArr);
      for (let i = 0; i < 7; i += 1) {
         const dateOfWeek = dayjs(dayjs().day(i)).format("YYYY-MM-DD");

         chartDataArr[i] = {
            name: `${dateOfWeek} / ${dayjs(dateOfWeek).format("ddd")}`,
         };
         projectNameArr?.forEach((projName) => {
            chartDataArr[i][projName] = 0;
         });

         entryArray?.forEach((each) => {
            if (!each?.length) return;
            for (let j = 0; j < each.length; j += 1) {
               const recordObj = each[j];
               if (recordObj.trackCreateDate === dateOfWeek) {
                  projectNameArr.forEach((proName) => {
                     if (recordObj.projectName === proName) {
                        chartDataArr[i][proName] += +recordObj.duration;
                     }
                  });
               }
            }
         });

         projectNameArr?.forEach((proName) => {
            chartDataArr[i][proName] = chartDataArr[i][proName].toFixed(2);
         });
      }
      setGraphData(chartDataArr);
      setLoading(false);
   };

   const parseChartJobData = async (entryJob) => {
      const chartDataArr = new Array(7);
      let projectNameArr = [];
      if (chartType === "account_track") {
         projectNameArr = myConsts.ACCOUNT_OPTIONS.map((each) => each.value);
         setProjectName(projectNameArr);
      } else if (chartType === "social_track") {
         projectNameArr = myConsts.JOB_BOARD_OPTIONS.map((each) => each.value);
         setProjectName(projectNameArr);
      } else if (chartType === "total_track") {
         projectNameArr = ["total_track"];
         setProjectName(projectNameArr);
      }

      for (let i = 0; i < 7; i += 1) {
         const dateOfWeek = dayjs(dayjs().day(i)).format("YYYY-MM-DD");

         chartDataArr[i] = {
            name: `${dateOfWeek} / ${dayjs(dateOfWeek).format("ddd")}`,
         };
         projectNameArr?.forEach((projName) => {
            chartDataArr[i][projName] = 0;
         });

         entryJob?.forEach((each) => {
            if (dayjs(each.createDate).format("YYYY-MM-DD") === dateOfWeek) {
               if (chartType === "total_track") {
                  chartDataArr[i].total_track += 1;
               } else {
                  projectNameArr.forEach((proName) => {
                     if (chartType === "account_track") {
                        if (each.account === proName) {
                           chartDataArr[i][proName] += 1;
                        }
                     } else if (chartType === "social_track") {
                        if (each.jobBoard === proName) {
                           chartDataArr[i][proName] += 1;
                        }
                     }
                  });
               }
            }
         });
      }
      setGraphData(chartDataArr);
      setLoading(false);
   };
   useEffect(() => {
      if (!loading) {
         setLoading(true);
      }
      if (chartType === "time_track") {
         trackApi.readAll().then((res) => {
            const entryArray = [];
            res.data.forEach((each) => {
               entryArray.push(each.data.chartStatusData);
            });
            parseChartTrackData(entryArray);
         });
      } else if (
         chartType === "account_track" ||
         chartType === "social_track" ||
         chartType === "total_track"
      ) {
         workApi.readAll().then((res) => {
            const jobArray = [];
            res.forEach((each) => {
               jobArray.push(each.data);
            });
            setTotalJob(jobArray.length);
            parseChartJobData(jobArray);
         });
      }
   }, [chartType]);

   return loading ? (
      <BackDrop open={loading} />
   ) : (
      <ResponsiveContainer width="100%" height="100%">
         <ComposedChart
            width={500}
            height={400}
            data={graphData}
            margin={{
               top: 20,
               right: 20,
               bottom: 20,
               left: 20,
            }}
         >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            {projectName[3] ? (
               <Area
                  type="monotone"
                  dataKey={projectName[3]}
                  fill="#8884d8"
                  stroke="#8884d8"
               />
            ) : (
               ""
            )}

            {projectName[0] ? (
               <Bar dataKey={projectName[0]} barSize={20} fill="#413ea0" />
            ) : (
               ""
            )}

            {projectName[1] ? (
               <Line
                  type="monotone"
                  dataKey={projectName[1]}
                  stroke="#ff7300"
               />
            ) : (
               ""
            )}
            {projectName[2] ? (
               <Scatter dataKey={projectName[2]} fill="red" />
            ) : (
               ""
            )}
            {projectName[4] ? (
               <Line
                  type="monotone"
                  dataKey={projectName[4]}
                  stroke="#4e2402"
               />
            ) : (
               ""
            )}
         </ComposedChart>
      </ResponsiveContainer>
   );
}
export default WeeklyChart;
