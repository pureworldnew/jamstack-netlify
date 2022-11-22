import React from "react";
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

const data = [
  {
    name: "Page A",
    sleepT: 590,
    sportsT: 800,
    workT: 1400,
    languageT: 490,
  },
  {
    name: "Page B",
    sleepT: 868,
    sportsT: 967,
    workT: 1506,
    languageT: 590,
  },
  {
    name: "Page C",
    sleepT: 1397,
    sportsT: 1098,
    workT: 989,
    languageT: 350,
  },
  {
    name: "Page D",
    sleepT: 1480,
    sportsT: 1200,
    workT: 1228,
    languageT: 480,
  },
  {
    name: "Page E",
    sleepT: 1520,
    sportsT: 1108,
    workT: 1100,
    languageT: 460,
  },
  {
    name: "Page F",
    sleepT: 1400,
    sportsT: 680,
    workT: 1700,
    languageT: 380,
  },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
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
        <Area type="monotone" dataKey="workT" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="sportsT" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="sleepT" stroke="#ff7300" />
        <Scatter dataKey="languageT" fill="red" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
