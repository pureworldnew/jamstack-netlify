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

export default function Chart() {
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [projectName, setProjectName] = useState([]);

  const getProjectName = async () => {
    try {
      const clockifyMeta = await trackApi.readClockifyApiMeta();
      console.log("clockifyMeta ", clockifyMeta);
      if (clockifyMeta.length === 1) {
        const { workspaceId } = clockifyMeta[0].data;
        return useClockify(
          `https://api.clockify.me/api/v1/workspaces/${workspaceId}/projects`,
          "GET"
        )
          .then((response) => response.map((each) => each.name))
          .catch((err) => {
            console.log(err);
          });
      } else {
        // alert("Please initialize clockify first");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const parseChartData = async (entryArray) => {
    console.log("EntryArray", entryArray);
    if (!entryArray.length) return;
    let chartDataArr = new Array(7);
    let projectNameArr = await getProjectName();
    setProjectName(projectNameArr);
    for (let i = 0; i < 7; i++) {
      let dateOfWeek = dayjs(dayjs().day(i)).format("YYYY-MM-DD");

      chartDataArr[i] = {
        name: dateOfWeek + " / " + dayjs(dateOfWeek).format("ddd"),
      };
      projectNameArr.forEach((projectName) => {
        chartDataArr[i][projectName] = 0;
      });

      entryArray.forEach((each) => {
        if (!each?.length) return;
        for (let j = 0; j < each.length; j++) {
          let recordObj = each[j];
          if (recordObj.trackCreateDate === dateOfWeek) {
            projectNameArr.forEach((projectName) => {
              if (recordObj.projectName === projectName) {
                chartDataArr[i][projectName] += +recordObj.duration;
              }
            });
          }
        }
      });

      projectNameArr.forEach((projectName) => {
        chartDataArr[i][projectName] = chartDataArr[i][projectName].toFixed(2);
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
      let entryArray = [];
      res.forEach((each) => {
        entryArray.push(each.data.chartStatusData);
      });
      parseChartData(entryArray);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
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
      )}
    </>
  );
}
