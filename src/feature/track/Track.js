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
  return (
    <>
      <h2>Clockify api integration</h2>
      <DataGrid columns={columns} rows={rows} />
    </>
  );
}
