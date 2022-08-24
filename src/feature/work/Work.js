import React, { useEffect, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ReactTable } from "components/table";

import AddNewWork from "./AddNewWork";
import api from "services/api";
import * as myConsts from "consts";
import { BackDrop } from "components/backdrop";

function Work() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleClickDelete = (rowData) => {
    console.log("selectedRows", rowData);
    api.delete(rowData.id).then((res) => {
      window.location.reload();
    });
  };

  useEffect(() => {
    setLoading(true);
    api.readAll().then((res) => {
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AddNewWork
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
        <Button variant="outlined" onClick={handleClickDelete}>
          Delete Rows
        </Button>
      </Box>

      {loading ? (
        <BackDrop open={loading} />
      ) : (
        <ReactTable
          columns={[
            ...columns,
            {
              Header: "Delete",
              id: "delete",
              accessor: (str) => "delete",

              Cell: (row) => (
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    handleClickDelete(row.row.original);
                  }}
                >
                  Delete
                </span>
              ),
            },
          ]}
          data={entry}
          setSelectedRows={setSelectedRows}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Work;
