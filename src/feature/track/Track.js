import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import * as myConsts from "consts";

export default function Track() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);

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
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
    setLoading(false);
  }, []);
  return (
    <>
      <CssBaseline />
      {loading ? (
        <BackDrop open={loading} />
      ) : (
        <ReactTable columns={[...columns]} data={entry} />
      )}
    </>
  );
}
