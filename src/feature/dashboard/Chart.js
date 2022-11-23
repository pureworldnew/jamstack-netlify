import React, { useEffect, useState } from "react";
import trackApi from "services/track";
import { BackDrop } from "components/backdrop";
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

  const parseChartData = (entryArray) => {
    let chartDataArr = new Array(7);
    for (let i = 0; i < 7; i++) {
      let dateOfWeek = dayjs(dayjs().day(i)).format("YYYY-MM-DD");
      chartDataArr[i] = {
        name: dateOfWeek + " / " + dayjs(dateOfWeek).format("ddd"),
        workT: 0,
        languageT: 0,
        sportsT: 0,
        sleepT: 0,
      };

      entryArray.forEach((each) => {
        for (let j = 0; j < each.length; j++) {
          let recordObj = each[j];
          if (recordObj.trackCreateDate === dateOfWeek) {
            switch (recordObj.projectName) {
              case "WorkT": {
                console.log(
                  "chartDataArr[i].workT",
                  chartDataArr[i].workT,
                  recordObj.duration
                );
                chartDataArr[i].workT += Number(recordObj.duration);
                break;
              }
              case "languageT":
                chartDataArr[i].languageT += Number(recordObj.duration);
                break;
              case "sportsT": {
                chartDataArr[i].sportsT += parseFloat(recordObj.duration);
                break;
              }
              case "SleepT":
                chartDataArr[i].sleepT += Number(recordObj.duration);
                break;
              default:
                break;
            }
          }
        }
      });
      chartDataArr[i].workT = chartDataArr[i].workT.toFixed(2);
      chartDataArr[i].languageT = chartDataArr[i].languageT.toFixed(2);
      chartDataArr[i].sportsT = chartDataArr[i].sportsT.toFixed(2);
      chartDataArr[i].sleepT = chartDataArr[i].sleepT.toFixed(2);
    }
    setGraphData(chartDataArr);
  };

  const getData = () => {
    if (!loading) {
      setLoading(true);
    }
    trackApi.readAll().then((res) => {
      let entryArray = [];
      console.log("res trackData", res);
      res.forEach((each) => {
        entryArray.push(each.data.chartStatusData);
      });
      setLoading(false);
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
              dataKey="workT"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="sportsT" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="sleepT" stroke="#ff7300" />
            <Scatter dataKey="languageT" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
