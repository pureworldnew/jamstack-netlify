import React, { useEffect, useState, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import AddNewStress from "./AddNewStress";
import stressApi from "services/stress";
import DeleteModal from "components/delete-modal/DeleteModal";

import * as myConsts from "consts";

function Stress() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    rowData: null,
  });

  const columns = useMemo(() => myConsts.STRESS_COLUMNS, []);
  useEffect(() => {
    setLoading(true);
    stressApi.readAll().then((res) => {
      let entryArray = [];
      res?.forEach((each) => {
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
      stressApi.delete(popup.rowData.id).then((res) => {
        window.location.reload();
      });
    }
  };

  const handleSubmitNew = (data) => {
    stressApi.create(data);
    window.location.reload();
    handleClose();
  };

  const handleSubmitEdit = (id, data) => {
    stressApi.update(id, data);
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
        <AddNewStress
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
          mode={"stressEntry"}
        />
      )}
    </>
  );
}

export default Stress;
