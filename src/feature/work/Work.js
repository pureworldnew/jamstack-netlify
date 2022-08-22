import React, { useEffect, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";

import { ReactTable } from "components/table";

import AddNewWork from "./AddNewWork";
import api from "services/api";
import * as myConsts from "consts";
import { BackDrop } from "components/backdrop";

function Work() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  useEffect(() => {
    setLoading(true);
    api.readAll().then((res) => {
      console.log(res);
      let entryArray = [];
      res.forEach((each) => {
        const { data, ref } = each;
        data["id"] = ref["@ref"]["id"];
        entryArray.push(data);
      });
      setEntry(entryArray);
      setLoading(false);
    });
  }, []);
  const columns = React.useMemo(() => myConsts.WORK_COLUMNS, []);

  return (
    <div>
      <CssBaseline />
      <AddNewWork
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      {loading ? (
        <BackDrop open={loading} />
      ) : (
        <ReactTable columns={columns} data={entry} />
      )}
    </div>
  );
}

export default Work;
