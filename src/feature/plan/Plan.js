/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import planApi from "services/plan";
import DeleteModal from "components/delete-modal/DeleteModal";

import * as myConsts from "consts";
import { toast, ToastContainer } from "react-toastify";
import AddNewPlan from "./AddNewPlan";

function Plan({ current = false }) {
   const queryClient = useQueryClient();
   const [open, setOpen] = useState(false);
   const [popup, setPopup] = useState({
      show: false, // initial values set to false and null
      rowData: null,
   });
   const [editData, setEditData] = useState({});

   const columns = useMemo(() => myConsts.PLAN_COLUMNS, []);

   const { isLoading, data: queryResults } = useQuery(
      ["get_plan_entries"],
      () => (current ? planApi.readOnlyCurrent() : planApi.readAll()),
      {
         select: (res) =>
            res?.map((each) => {
               const { data, ref } = each;
               data.id = ref["@ref"].id;
               if (data.createDate !== undefined) {
                  data.createDate = new Date(data.createDate).toLocaleString();
               }
               if (data.finishedDate !== undefined) {
                  data.finishedDate = new Date(
                     data.finishedDate
                  ).toLocaleString();
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

   const { isLoading: isNewLoading, mutate: createNewPlanEntry } = useMutation(
      (workEntries) => planApi.create(workEntries),
      {
         onSuccess: async () => {
            await queryClient.invalidateQueries(["get_plan_entries"]);
            toast.success("Inserted Successfully!", myConsts.TOAST_CONFIG);
         },
         onError: (error) => {
            if (Array.isArray(error.data.error)) {
               error.data.error.forEach((el) => {
                  toast.error(el.message, {
                     position: "top-right",
                  });
               });
            } else {
               toast.error(error.data.message, {
                  position: "top-right",
               });
            }
         },
      }
   );

   const { isLoading: isUpdateLoading, mutate: updatePlanEntry } = useMutation(
      ({ id, data }) => planApi.update(id, data),
      {
         onSuccess: async () => {
            await queryClient.invalidateQueries(["get_plan_entries"]);
            toast.success(
               "Plan Entry updated successfully",
               myConsts.TOAST_CONFIG
            );
         },
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

   const { mutate: deletePlanEntry } = useMutation((id) => planApi.delete(id), {
      onSuccess: async () => {
         await queryClient.invalidateQueries("get_plan_entries");
         toast.success(
            "Plan Entries deleted successfully!",
            myConsts.TOAST_CONFIG
         );
         setPopup({ show: false, rowData: null });
      },
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
   });

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

   const handleSubmitNew = (data) => {
      const localData = JSON.parse(JSON.stringify(data));

      if (localData.planStatus === undefined || localData.planStatus === "") {
         localData.planStatus = "notFinished";
      }
      createNewPlanEntry(localData);
   };

   const handleClickEdit = (rowData) => {
      console.log("handleClickEdit", rowData);
      setEditData(rowData);
      setOpen(true);
   };

   return (
      <>
         <CssBaseline />
         <ToastContainer />
         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <AddNewPlan
               open={open}
               setOpen={setOpen}
               isNewLoading={isNewLoading}
               isUpdateLoading={isUpdateLoading}
               handleClose={handleClose}
               handleSubmitNew={handleSubmitNew}
               handleSubmitEdit={({ id, data }) => {
                  updatePlanEntry({ id, data });
               }}
               editData={editData}
            />
         </Box>

         <DeleteModal
            delOpen={popup.show}
            setDelOpen={setPopup}
            handleClickConfirm={() => deletePlanEntry(popup.rowData?.id)}
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
               mode="planEntry"
               handleNewClick={handleClickOpen}
            />
         )}
      </>
   );
}

export default Plan;
