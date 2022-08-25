import React, { useEffect, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
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
  const [editData, setEditData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = (rowData) => {
    api.delete(rowData.id).then((res) => {
      window.location.reload();
    });
  };

  const handleSubmitNew = (data) => {
    api.create(data);
    window.location.reload();
    handleClose();
  };

  const handleSubmitEdit = (id, data) => {
    api.update(id, data);
    window.location.reload();
    handleClose();
  };

  const handleClickEdit = (rowData) => {
    setEditData(rowData);
    setOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    api.readAll().then((res) => {
      let entryArray = [];
      res.forEach((each) => {
        const { data, ref } = each;
        data["id"] = ref["@ref"]["id"];
        if (data["createDate"] !== undefined) {
          data["createDate"] = new Date(
            data["createDate"]
          ).toLocaleDateString();
        }
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddNewWork
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleSubmitNew={handleSubmitNew}
          handleSubmitEdit={handleSubmitEdit}
          editData={editData}
        />
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
            {
              Header: "Edit",
              id: "edit",
              accessor: (str) => "Edit",
              Cell: (row) => (
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    handleClickEdit(row.row.original);
                  }}
                >
                  Edit
                </span>
              ),
            },
          ]}
          data={entry}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Work;
