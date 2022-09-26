import React, { useEffect, useState, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import AddNewPlan from "feature/plan/AddNewPlan";
import Title from "./Title";
import planApi from "services/plan";
import DeleteModal from "components/delete-modal/DeleteModal";
import { formatDate } from "utils/formatDate";
import * as myConsts from "consts";

function CurrentPlan() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    rowData: null,
  });
  const [editData, setEditData] = useState({});

  const columns = useMemo(() => myConsts.PLAN_COLUMNS, []);
  useEffect(() => {
    setLoading(true);
    planApi.readOnlyCurrent().then((res) => {
      console.log("res", res);
      let entryArray = [];
      res.forEach((each) => {
        const { data, ref } = each;
        data["id"] = ref["@ref"]["id"];
        if (data["createDate"] !== undefined) {
          data["createDate"] = new Date(data["createDate"]).toLocaleString();
        }
        if (data["finishedDate"] !== undefined) {
          data["finishedDate"] = new Date(
            data["finishedDate"]
          ).toLocaleString();
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
    setEditData({});
    setOpen(false);
  };

  const handleClickDelete = (rowData) => {
    setPopup({
      show: true,
      rowData,
    });
  };

  const handleClickConfirm = () => {
    if (popup.show && popup.rowData) {
      planApi.delete(popup.rowData.id).then((res) => {
        window.location.reload();
      });
    }
  };

  const handleSubmitNew = (data) => {
    if (data.planStatus === undefined) {
      data.planStatus = "notFinished";
    }
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
      <Title>Today Plan</Title>
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

      <DeleteModal
        delOpen={popup.show}
        setDelOpen={setPopup}
        handleClickConfirm={handleClickConfirm}
      />

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
                <Chip
                  label="Delete"
                  onClick={() => handleClickDelete(row.row.original)}
                  onDelete={() => handleClickDelete(row.row.original)}
                />
              ),
            },
            {
              Header: "Edit",
              id: "edit",
              accessor: (str) => "Edit",
              Cell: (row) => (
                <Chip
                  label="Edit"
                  onClick={() => handleClickEdit(row.row.original)}
                />
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

export default CurrentPlan;
