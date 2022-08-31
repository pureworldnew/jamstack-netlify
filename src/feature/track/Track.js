import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import * as myConsts from "consts";

export default function Track() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickClockify = () => {
    let workspacePromise = fetch("https://api.clockify.me/api/v1/workspaces", {
      method: "GET",
      headers: {
        "X-API-KEY": "ZTJkN2JlM2UtNWQ3NS00ZTYyLWJiZWQtYjAyOGVjZDYxNGVl",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    let userPromise = fetch("https://api.clockify.me/api/v1/user", {
      method: "GET",
      headers: {
        "X-API-KEY": "ZTJkN2JlM2UtNWQ3NS00ZTYyLWJiZWQtYjAyOGVjZDYxNGVl",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    Promise.allSettled([workspacePromise, userPromise])
      .then((res) =>
        res.map((each) => {
          if (each.status === "fulfilled") {
            return each.value;
          }
        })
      )
      .then((response) => {
        const workspaceId = response[0][0].id;
        const userId = response[1].id;
        fetch(
          `https://api.clockify.me/api/v1//workspaces/${workspaceId}/user/${userId}/time-entries`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "ZTJkN2JlM2UtNWQ3NS00ZTYyLWJiZWQtYjAyOGVjZDYxNGVl",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const columns = React.useMemo(() => myConsts.TRACK_COLUMNS, []);
  // useEffect(() => {
  //   setLoading(true);
  //   setLoading(false);
  // }, []);
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleClickClockify}>
          Import Clockify
        </Button>
      </Box>

      {loading ? (
        <BackDrop open={loading} />
      ) : (
        <ReactTable columns={[...columns]} data={entry} />
      )}
    </>
  );
}
