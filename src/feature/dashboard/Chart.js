/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import trackApi from "services/track";
import { BackDrop } from "components/backdrop";
import useClockify from "hooks/useClockify";
import * as dayjs from "dayjs";

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

function Chart() {
   const [loading, setLoading] = useState(false);
   const [graphData, setGraphData] = useState([]);
   const [projectName, setProjectName] = useState([]);

   const getProjectName = async () => {
      try {
         const clockifyMeta = await trackApi.readClockifyApiMeta();
         console.log("clockifyMeta ", clockifyMeta.data);

         if (clockifyMeta.data.length === 1) {
            const { workspaceId } = clockifyMeta.data[0].data;
            return useClockify(
               `https://api.clockify.me/api/v1/workspaces/${workspaceId}/projects`,
               "GET"
            )
               .then((response) => response.map((each) => each.name))
               .catch((err) => {
                  console.log(err);
               });
         }
      } catch (err) {
         console.log(err);
      }
   };

   const parseChartData = async (entryArray) => {
      const chartDataArr = new Array(7);
      const projectNameArr = await getProjectName();
      setProjectName(projectNameArr);
      for (let i = 0; i < 7; i += 1) {
         const dateOfWeek = dayjs(dayjs().day(i)).format("YYYY-MM-DD");

         chartDataArr[i] = {
            name: `${dateOfWeek} / ${dayjs(dateOfWeek).format("ddd")}`,
         };
         projectNameArr.forEach((projName) => {
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

         projectNameArr.forEach((proName) => {
            chartDataArr[i][proName] = chartDataArr[i][proName].toFixed(2);
         });
      }
      setGraphData(chartDataArr);
      setLoading(false);
   };

   const getData = () => {
      if (!loading) {
         setLoading(true);
      }
      trackApi.readAll().then((res) => {
         console.log("trackAPI readAll res", res);
         const entryArray = [];
         res.data.forEach((each) => {
            entryArray.push(each.data.chartStatusData);
         });
         parseChartData(entryArray);
      });
   };
   useEffect(() => {
      getData();
   }, []);
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
            <Area
               type="monotone"
               dataKey={projectName[3]}
               fill="#8884d8"
               stroke="#8884d8"
            />
            <Bar dataKey={projectName[2]} barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey={projectName[1]} stroke="#ff7300" />
            <Scatter dataKey={projectName[0]} fill="red" />
         </ComposedChart>
      </ResponsiveContainer>
   );
}
export default Chart;
