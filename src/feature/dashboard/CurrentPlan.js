/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import AddNewPlan from "feature/plan/AddNewPlan";
import planApi from "services/plan";
import DeleteModal from "components/delete-modal/DeleteModal";

import * as myConsts from "consts";
import { toast, ToastContainer } from "react-toastify";
import { Title } from "components/title";

function CurrentPlan() {
   const [entry, setEntry] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [refreshData, setRefreshData] = useState(false);
   const [popup, setPopup] = useState({
      show: false, // initial values set to false and null
      rowData: null,
   });
   const [editData, setEditData] = useState({});

   const columns = useMemo(() => myConsts.PLAN_COLUMNS, []);

   const getData = async () => {
      const res = await planApi.readOnlyCurrent();
      const entryArray = [];
      res.data.forEach((each) => {
         const { data, ref } = each;
         data.id = ref["@ref"].id;
         if (data.createDate !== undefined) {
            data.createDate = new Date(data.createDate).toLocaleString();
         }
         if (data.finishedDate !== undefined) {
            data.finishedDate = new Date(data.finishedDate).toLocaleString();
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
   }, [refreshData, open]);

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
            toast.success("Deleted Successfully!", myConsts.TOAST_CONFIG);
            setRefreshData(true);
            setPopup({ show: false, rowData: null });
         });
      }
   };

   const handleSubmitNew = (data) => {
      const localData = JSON.parse(JSON.stringify(data));
      if (localData.planStatus === undefined || localData.planStatus === "") {
         localData.planStatus = "notFinished";
      }
      planApi.create(localData).then((res) => {
         toast.success("Inserted Successfully!", myConsts.TOAST_CONFIG);
         setRefreshData(true);
         handleClose();
      });
   };

   const handleSubmitEdit = (id, data) => {
      planApi.update(id, data).then((res) => {
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
         <Title>
            {`Today Plan : Yesterday is history, Tomorrow is a mystery, but today is a
            gift, so it's called the present.`.toUpperCase()}
         </Title>
         <CssBaseline />
         <ToastContainer />
         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <AddNewPlan
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
               mode="planEntry"
               handleNewClick={handleClickOpen}
            />
         )}
      </>
   );
}

export default CurrentPlan;
