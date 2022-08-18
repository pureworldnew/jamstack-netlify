import React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import { ReactTable } from "components/table";

import { makeData, COLUMNS } from "./makeData";
import AddNewWork from "./AddNewWork";

function Work() {
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => makeData(20), []);

  return (
    <div>
      <CssBaseline />
      <AddNewWork />
      <ReactTable columns={columns} data={data} />
    </div>
  );
}

export default Work;
