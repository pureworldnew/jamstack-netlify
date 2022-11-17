import React, { useEffect, useState, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import AddNewPlan from "./AddNewPlan";
import planApi from "services/plan";
import DeleteModal from "components/delete-modal/DeleteModal";
import CustomizedSnackbars from "components/customized-snackbars/CustomizedSnackbars";

import * as myConsts from "consts";

function Plan() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    rowData: null,
  });
  const [editData, setEditData] = useState({});

  const columns = useMemo(() => myConsts.PLAN_COLUMNS, []);

  const getData = async () => {
    const res = await planApi.readAll();
    let entryArray = [];
    res.forEach((each) => {
      const { data, ref } = each;
      data["id"] = ref["@ref"]["id"];
      if (data["createDate"] !== undefined) {
        data["createDate"] = new Date(data["createDate"]).toLocaleString();
      }
      if (data["finishedDate"] !== undefined) {
        data["finishedDate"] = new Date(data["finishedDate"]).toLocaleString();
      }
      entryArray.push(data);
    });
    setEntry(entryArray);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  useEffect(() => {
    getData();
    setRefreshData(false);
  }, [refreshData]);

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
      planApi.delete(popup.rowData.id);
      setToastText("Deleted Successfully!");
      setOpenToast(true);
      setRefreshData(true);
      setPopup({ show: false, rowData: null });
    }
  };

  const handleSubmitNew = (data) => {
    let local_data = JSON.parse(JSON.stringify(data));

    if (local_data.planStatus === undefined || local_data.planStatus === "") {
      local_data.planStatus = "notFinished";
    }
    planApi.create(local_data).then((res) => {
      setToastText("Inserted Successfully!");
      setOpenToast(true);
      setRefreshData(true);
      setPopup({ show: false, rowData: null });
      handleClose();
    });
  };

  const handleSubmitEdit = (id, data) => {
    planApi.update(id, data).then((res) => {
      setToastText("Updated Successfully!");
      setOpenToast(true);
      setRefreshData(true);
      setPopup({ show: false, rowData: null });
      handleClose();
    });
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
      <CustomizedSnackbars
        open={openToast}
        setOpen={setOpenToast}
        labelText={toastText}
      />
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

export default Plan;
