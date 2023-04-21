/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import { toast, ToastContainer } from "react-toastify";

import adminApi from "services/admin";

import DeleteModal from "components/delete-modal/DeleteModal";
import * as myConsts from "consts";
import AddNewAdmin from "./AddNewAdmin";

function Admin() {
   const queryClient = useQueryClient();
   const [popup, setPopup] = useState({
      show: false, // initial values set to false and null
      rowData: null,
   });
   const [editData, setEditData] = useState({});
   const [open, setOpen] = useState(false);
   const { isLoading, data: queryResults } = useQuery(
      ["get_profile_entries"],
      () => adminApi.readAll(),
      {
         select: (res) => res,
         onError: (error) => {
            if (Array.isArray(error.data.error)) {
               error.data.error.forEach((el) =>
                  toast.error(el.message, {
                     position: "top-right",
                  })
               );
            } else {
               toast.error(error.data.message, {
                  position: "top-right",
               });
            }
         },
      }
   );

   const { mutate: deleteProfileEntry } = useMutation(
      (id) => adminApi.delete(id),
      {
         onSuccess(data) {
            queryClient.invalidateQueries("get_profile_entries");
            toast.success("Profile Entries deleted successfully!");
            setPopup({ show: false, rowData: null });
         },
         onError(error) {
            if (Array.isArray(error.data.error)) {
               error.data.error.forEach((el) =>
                  toast.error(el.message, {
                     position: "top-right",
                  })
               );
            } else {
               toast.error(error.data.message, {
                  position: "top-right",
               });
            }
         },
      }
   );

   const handleClose = () => {
      setEditData({});
      setOpen(false);
   };

   const { isLoading: loadingUpdate, mutate: updateProfileEntry } = useMutation(
      ({ id, data }) => adminApi.update(id, data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["get_profile_entries"]);
            toast.success("Profile Entry updated successfully");
            handleClose();
         },
         onError: (error) => {
            handleClose();
            if (Array.isArray(error.data.error)) {
               error.data.error.forEach((el) =>
                  toast.error(el.message, {
                     position: "top-right",
                  })
               );
            } else {
               toast.error(error.data.message, {
                  position: "top-right",
               });
            }
         },
      }
   );

   const columns = useMemo(() => myConsts.ADMIN_COLUMNS, []);

   const handleClickDelete = (rowData) => {
      setPopup({
         show: true,
         rowData,
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
            <AddNewAdmin
               loadingUpdate={loadingUpdate}
               open={open}
               setOpen={setOpen}
               handleClickOpen={() => setOpen(true)}
               handleClose={handleClose}
               handleSubmitEdit={({ id, data }) => {
                  updateProfileEntry({ id, data });
               }}
               editData={editData}
            />
         </Box>

         <ToastContainer />

         <DeleteModal
            delOpen={popup.show}
            setDelOpen={setPopup}
            handleClickConfirm={() => deleteProfileEntry(popup.rowData?._id)}
         />

         {isLoading ? (
            <BackDrop open={isLoading} />
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
               data={queryResults}
               mode="profileEntry"
            />
         )}
      </>
   );
}

export default Admin;
