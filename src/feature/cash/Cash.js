/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import cashApi from "services/cash";
import DeleteModal from "components/delete-modal/DeleteModal";
import * as myConsts from "consts";
import { toast, ToastContainer } from "react-toastify";
import AddNewCash from "./AddNewCash";

function Cash() {
   const [entry, setEntry] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [refreshData, setRefreshData] = useState(false);
   const [popup, setPopup] = useState({
      show: false, // initial values set to false and null
      rowData: null,
   });
   const [editData, setEditData] = useState({});

   const columns = useMemo(() => myConsts.CASH_COLUMNS, []);
   const getData = async () => {
      const res = await cashApi.readAll();
      const entryArray = [];
      res.data.forEach((each) => {
         const { data, ref } = each;
         data.id = ref["@ref"].id;
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
         cashApi.delete(popup.rowData.id);
         toast.success("Deleted Successfully!", myConsts.TOAST_CONFIG);
         setRefreshData(true);
         setPopup({ show: false, rowData: null });
      }
   };

   const handleSubmitNew = (data) => {
      cashApi.create(data).then((res) => {
         toast.success("Inserted Successfully!", myConsts.TOAST_CONFIG);
         setRefreshData(true);
         handleClose();
      });
   };

   const handleSubmitEdit = (id, data) => {
      cashApi.update(id, data).then((res) => {
         toast.success("Updated Successfully!", myConsts.TOAST_CONFIG);
         setRefreshData(true);
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
         <ToastContainer />
         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <AddNewCash
               open={open}
               setOpen={setOpen}
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
                     disableFilters: true,
                     disableSortBy: true,
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
                     disableFilters: true,
                     disableSortBy: true,
                  },
               ]}
               data={entry}
               mode="cashEntry"
               handleNewClick={handleClickOpen}
            />
         )}
      </>
   );
}

export default Cash;
