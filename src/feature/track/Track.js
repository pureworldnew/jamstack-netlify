import React, { useState, useEffect } from "react";
import DataGrid from "react-data-grid";

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
];

const rows = [
  { id: 0, title: "Example" },
  { id: 1, title: "Demo" },
];

export default function Track() {
  console.log("start 1");
  useEffect(() => {
    fetch("https://api.clockify.me/api/v1/user", {
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
  }, []);
  return (
    <>
      <h2>Clockify api integration</h2>
      <DataGrid columns={columns} rows={rows} />
    </>
  );
}
