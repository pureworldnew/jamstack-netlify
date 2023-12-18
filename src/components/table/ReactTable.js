/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./TableStyle.css";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { matchSorter } from "match-sorter";

import {
   useTable,
   useRowSelect,
   usePagination,
   useFilters,
   useGlobalFilter,
   useAsyncDebounce,
   useSortBy,
} from "react-table";
import workApi from "services/work";
import trackApi from "services/track";
import planApi from "services/plan";
import cashApi from "services/cash";
import stressApi from "services/stress";
import adminApi from "services/admin";

import DeleteModal from "components/delete-modal/DeleteModal";

const IndeterminateCheckbox = React.forwardRef(
   ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
         resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return <input type="checkbox" ref={resolvedRef} {...rest} />;
   }
);

// Define a default UI for filtering
function GlobalFilter({
   preGlobalFilteredRows,
   globalFilter,
   setGlobalFilter,
}) {
   const count = preGlobalFilteredRows.length;
   const [value, setValue] = React.useState(globalFilter);
   const onChange = useAsyncDebounce((val) => {
      setGlobalFilter(val || undefined);
   }, 200);

   return (
      <span>
         Search:{" "}
         <input
            value={value || ""}
            onChange={(e) => {
               setValue(e.target.value);
               onChange(e.target.value);
            }}
            placeholder={`${count} records...`}
            style={{
               fontSize: "1.1rem",
               border: "0",
            }}
         />
      </span>
   );
}

// Define a default UI for filtering
function DefaultColumnFilter({
   column: { filterValue, preFilteredRows, setFilter },
}) {
   const count = preFilteredRows.length;

   return (
      <input
         value={filterValue || ""}
         onChange={(e) => {
            setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
         }}
         placeholder={`Search ${count} records...`}
      />
   );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
   return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export function ReactTable({ columns, data, mode, initialState }) {
   const [popup, setPopup] = React.useState({
      show: false, // initial values set to false and null
      rowData: null,
   });
   const filterTypes = React.useMemo(
      () => ({
         // Add a new fuzzyTextFilterFn filter type.
         fuzzyText: fuzzyTextFilterFn,
         // Or, override the default text filter to use
         // "startWith"
         text: (rows, id, filterValue) =>
            rows.filter((row) => {
               const rowValue = row.values[id];
               return rowValue !== undefined
                  ? String(rowValue)
                       .toLowerCase()
                       .startsWith(String(filterValue).toLowerCase())
                  : true;
            }),
      }),
      []
   );

   const defaultColumn = React.useMemo(
      () => ({
         // Let's set up our default Filter UI
         Filter: DefaultColumnFilter,
      }),
      []
   );
   // Use the state and functions returned from useTable to build your UI
   const {
      getTableProps,
      headerGroups,
      prepareRow,
      selectedFlatRows,
      page,
      gotoPage,
      setPageSize,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
      state: { pageIndex, pageSize, globalFilter },
   } = useTable(
      {
         columns,
         data,
         defaultColumn, // Be sure to pass the defaultColumn option
         filterTypes,
         initialState: { ...initialState, pageIndex: 0 },
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
         hooks.visibleColumns.push((cols) => [
            // Let's make a column for selection
            {
               id: "selection",
               // The header can use the table's getToggleAllRowsSelectedProps method
               // to render a checkbox
               Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                     <IndeterminateCheckbox
                        {...getToggleAllRowsSelectedProps()}
                     />
                  </div>
               ),
               // The cell can use the individual row's getToggleRowSelectedProps method
               // to the render a checkbox
               Cell: ({ row }) => (
                  <div>
                     <IndeterminateCheckbox
                        {...row.getToggleRowSelectedProps()}
                     />
                  </div>
               ),
            },
            ...cols,
         ]);
      }
   );

   const handleClickDelete = () => {
      setPopup({
         show: true,
         rowData: selectedFlatRows,
      });
   };

   const handleClickRows = async () => {
      if (popup.show && popup.rowData && popup.rowData.length) {
         const ids = selectedFlatRows.map((each) => each.original.id);
         switch (mode) {
            case "workEntry":
               await workApi.batchDelete(ids);
               break;
            case "trackEntry":
               await trackApi.batchDelete(ids);
               break;
            case "planEntry":
               await planApi.batchDelete(ids);
               break;
            case "cashEntry":
               await cashApi.batchDelete(ids);
               break;
            case "stressEntry":
               await stressApi.batchDelete(ids);
               break;
            case "profileEntry":
               await adminApi.batchDelete(ids);
               break;
            default:
               break;
         }
         window.location.reload();
      }
   };

   const handleChangePage = (event, newPage) => {
      gotoPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setPageSize(parseInt(event.target.value, 10));
      gotoPage(0);
   };

   // Render the UI for your table
   return (
      <>
         <Button
            variant="outlined"
            onClick={handleClickDelete}
            disabled={!selectedFlatRows.length}
         >
            Delete Rows
         </Button>
         <DeleteModal
            delOpen={popup.show}
            setDelOpen={setPopup}
            handleClickConfirm={handleClickRows}
         />
         <TableContainer component={Paper}>
            <MaUTable
               sx={{ minWidth: 650 }}
               aria-label="simple table"
               {...getTableProps()}
            >
               <TableHead>
                  {headerGroups.map((headerGroup) => (
                     <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                           <TableCell
                              component="th"
                              scope="row"
                              {...column.getHeaderProps(
                                 column.getSortByToggleProps()
                              )}
                           >
                              {column.render("Header")}
                              {/* Render the columns filter UI */}
                              <div>
                                 {column.canFilter
                                    ? column.render("Filter")
                                    : null}
                              </div>
                              {/* Add a sort direction indicator */}
                              <span>
                                 {column.isSorted
                                    ? column.isSortedDesc
                                       ? " 🔽"
                                       : " 🔼"
                                    : ""}
                              </span>
                           </TableCell>
                        ))}
                     </TableRow>
                  ))}
                  <tr>
                     <th
                        colSpan={visibleColumns.length}
                        style={{
                           textAlign: "left",
                        }}
                     >
                        <GlobalFilter
                           preGlobalFilteredRows={preGlobalFilteredRows}
                           globalFilter={globalFilter}
                           setGlobalFilter={setGlobalFilter}
                        />
                     </th>
                  </tr>
               </TableHead>
               <TableBody>
                  {page.map((row) => {
                     prepareRow(row);
                     return (
                        <TableRow
                           sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                           }}
                           {...row.getRowProps()}
                        >
                           {row.cells.map((cell) => (
                              <TableCell align="right" {...cell.getCellProps()}>
                                 {cell.render("Cell")}
                              </TableCell>
                           ))}
                        </TableRow>
                     );
                  })}
               </TableBody>
            </MaUTable>
            <TablePagination
               component="div"
               count={data.length}
               page={pageIndex}
               onPageChange={handleChangePage}
               rowsPerPage={pageSize}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </TableContainer>
      </>
   );
}
