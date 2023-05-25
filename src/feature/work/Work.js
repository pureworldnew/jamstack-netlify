/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import { toast } from "react-toastify";

import workApi from "services/work";

import DeleteModal from "components/delete-modal/DeleteModal";
import * as myConsts from "consts";
import AddNewWork from "./AddNewWork";

function Work() {
   const queryClient = useQueryClient();
   const [popup, setPopup] = useState({
      show: false, // initial values set to false and null
      rowData: null,
   });
   const [editData, setEditData] = useState({});
   const [duplicated, setDuplicated] = useState([]);
   const [open, setOpen] = useState(false);
   const { isLoading, data: queryResults } = useQuery(
      ["get_work_entries"],
      () => workApi.readAll(),
      {
         select: (res) =>
            res?.map((each) => {
               const { data, ref } = each;
               data.id = ref["@ref"].id;
               if (data.createDate !== undefined) {
                  data.createDate = new Date(data.createDate).toLocaleString();
               }
               return data;
            }),
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

   const { mutate: deleteWorkEntry } = useMutation((id) => workApi.delete(id), {
      onSuccess(data) {
         queryClient.invalidateQueries("get_work_entries");
         toast.success("Work Entries deleted successfully!");
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
   });

   const handleClose = () => {
      setEditData({});
      setOpen(false);
   };

   const { isLoading: loadingUpdate, mutate: updateWorkEntry } = useMutation(
      ({ id, data }) => workApi.update(id, data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["get_work_entries"]);
            toast.success("Work Entry updated successfully");
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

   const columns = useMemo(() => myConsts.WORK_COLUMNS, []);

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

   const checkCompanyDup = async (val, name) => {
      const res = await workApi.checkDupCompany(val, name);
      setDuplicated(res);
   };

   return (
      <>
         <CssBaseline />
         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <AddNewWork
               duplicated={duplicated}
               loadingUpdate={loadingUpdate}
               open={open}
               setOpen={setOpen}
               handleClickOpen={() => setOpen(true)}
               checkCompanyDup={checkCompanyDup}
               handleClose={handleClose}
               handleSubmitEdit={({ id, data }) => {
                  updateWorkEntry({ id, data });
               }}
               editData={editData}
            />
         </Box>

         <DeleteModal
            delOpen={popup.show}
            setDelOpen={setPopup}
            handleClickConfirm={() => deleteWorkEntry(popup.rowData?.id)}
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
               mode="workEntry"
            />
         )}
      </>
   );
}

export default Work;
