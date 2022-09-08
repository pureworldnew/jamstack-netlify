import React, { useEffect, useState, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import AddNewPlan from "./AddNewPlan";
import planApi from "services/plan";
import { formatDate } from "util/formatDate";
import * as myConsts from "consts";

function Plan() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const columns = useMemo(() => myConsts.PLAN_COLUMNS, []);
  useEffect(() => {
    setLoading(true);
    planApi.readAll().then((res) => {
      let entryArray = [];
      res.forEach((each) => {
        const { data, ref } = each;
        data["id"] = ref["@ref"]["id"];
        if (data["createDate"] !== undefined) {
          data["createDate"] = formatDate(new Date(data["createDate"]));
        }
        entryArray.push(data);
      });
      setEntry(entryArray);
      setLoading(false);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = (rowData) => {
    planApi.delete(rowData.id).then((res) => {
      window.location.reload();
    });
  };

  const handleSubmitNew = (data) => {
    planApi.create(data);
    window.location.reload();
    handleClose();
  };

  const handleSubmitEdit = (id, data) => {
    planApi.update(id, data);
    window.location.reload();
    handleClose();
  };

  const handleClickEdit = (rowData) => {
    setEditData(rowData);
    setOpen(true);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddNewPlan
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
          mode={"planEntry"}
        />
      )}
    </>
  );
}

export default Plan;
