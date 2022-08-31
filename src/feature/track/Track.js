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
    console.log("sdfsd");
  };

  const columns = React.useMemo(() => myConsts.TRACK_COLUMNS, []);
  useEffect(() => {
    setLoading(true);
    fetch("https://api.clockify.me/api/v1/workspaces", {
      method: "GET",
      headers: {
        "X-API-KEY": "ZTJkN2JlM2UtNWQ3NS00ZTYyLWJiZWQtYjAyOGVjZDYxNGVl",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log("workspace", response))
      .catch((error) => console.error(error));
    setLoading(false);
  }, []);
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
