import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import * as myConsts from "consts";
import trackApi from "services/track";
import useClockify from "hooks/useClockify";
import { formatDate } from "util/formatDate";

export default function Track() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialState = { hiddenColumns: ["timeEntryId"] };

  const columns = React.useMemo(() => myConsts.TRACK_COLUMNS, []);

  const getData = () => {
    if (!loading) {
      setLoading(true);
    }
    trackApi.readAll().then((res) => {
      let entryArray = [];
      console.log("trackData length", res.length);
      res.forEach((each) => {
        const { data, ref } = each;
        data["id"] = ref["@ref"]["id"];
        if (data["createDate"] !== undefined) {
          data["createDate"] = new Date(
            data["createDate"]
          ).toLocaleDateString();
        }
        if (data["start"] !== undefined) {
          data["start"] = formatDate(new Date(data["start"]));
        }
        if (data["end"] !== undefined) {
          data["end"] = formatDate(new Date(data["end"]));
        }
        entryArray.push(data);
      });
      setLoading(false);
      setEntry(entryArray);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleClickClockifyImport = async () => {
    setLoading(true);
    try {
      const clockifyMeta = await trackApi.readClockifyApiMeta();
      console.log("clockifyMeta ", clockifyMeta);
      if (clockifyMeta.length === 1) {
        const { workspaceId, userId } = clockifyMeta[0].data;
        useClockify(
          `https://api.clockify.me/api/v1/workspaces/${workspaceId}/user/${userId}/time-entries`,
          "GET"
        )
          .then(async (response) => {
            console.log("response from api", response);
            let paramArray = [];
            for (const each of response) {
              const projectId = each.projectId;
              const taskId = each.taskId;
              const tagIds = each.tagIds;
              let projectName = "";
              let taskName = "";
              let tagName = "";
              if (projectId) {
                let projectDetail = await useClockify(
                  `https://api.clockify.me/api/v1/workspaces/${workspaceId}/projects/${projectId}`,
                  "GET"
                );
                projectName = projectDetail.name;
                if (taskId) {
                  let taskDetail = await useClockify(
                    `https://api.clockify.me/api/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
                    "GET"
                  );
                  taskName = taskDetail.name;
                }
              }
              if (tagIds?.length) {
                const tagPromises = [];
                tagIds.forEach((tagId) => {
                  let tagPromise = useClockify(
                    `https://api.clockify.me/api/v1/workspaces/${workspaceId}/tags/${tagId}`,
                    "GET"
                  ).then((detail) => detail.name);
                  tagPromises.push(tagPromise);
                });
                Promise.all(tagPromises).then((res) => {
                  tagName = res.join(",");
                });
              }
              paramArray.push({
                data: {
                  timeEntryId: each.id,
                  description: each.description,
                  projectId: projectName,
                  start: each.timeInterval.start,
                  end: each.timeInterval.end,
                  duration: each.timeInterval.duration,
                  tagIds: tagName,
                  taskId: taskName,
                },
              });
            }
            console.log("paramArray", paramArray);
            trackApi
              .create(paramArray)
              .then((res) => {
                setLoading(false);
                getData();
              })
              .catch((err) => console.log(err));
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        alert("Please initialize clockify first");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleClickInitClockify = () => {
    setLoading(true);
    let workspacePromise = useClockify(
      "https://api.clockify.me/api/v1/workspaces",
      "GET"
    );
    let userPromise = useClockify("https://api.clockify.me/api/v1/user", "GET");
    Promise.allSettled([workspacePromise, userPromise])
      .then((res) =>
        res.map((each) => {
          if (each.status === "fulfilled") {
            return each.value;
          }
        })
      )
      .then(async (response) => {
        const workspaceId = response[0][0].id;
        const userId = response[1].id;
        // create or update existing clockifyAPI Meta data
        try {
          const clockifyMeta = await trackApi.readClockifyApiMeta();

          if (clockifyMeta.length === 1) {
            const clockifyMetaId = clockifyMeta[0].ref["@ref"]["id"];
            trackApi
              .udpateClockifyApiMeta(clockifyMetaId, { workspaceId, userId })
              .then((res) => {
                console.log("clockify api key updated successfully", res);
                setLoading(false);
              });
          } else {
            trackApi
              .createClockifyApiMeta({ workspaceId, userId })
              .then((res) => {
                console.log("clockify api key created successfully", res);
                setLoading(false);
              });
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClickDelete = async (rowData) => {
    setLoading(true);
    try {
      const clockifyMeta = await trackApi.readClockifyApiMeta();
      const { workspaceId } = clockifyMeta[0].data;
      const timeEntryId = rowData.timeEntryId;
      useClockify(
        `https://api.clockify.me/api/v1/workspaces/${workspaceId}/time-entries/${timeEntryId}`,
        "DELETE"
      )
        .then(() => {
          console.log("success after deleting from clockify api");
          trackApi.delete(rowData.id).then((res) => {
            getData();
            console.log("successfully deleted from Fauna", res);
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={handleClickClockifyImport}
          sx={{ marginRight: "15px" }}
        >
          Import Clockify
        </Button>
        <Button variant="outlined" onClick={handleClickInitClockify}>
          Clockify Initialization
        </Button>
      </Box>

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
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    handleClickDelete(row.row.original);
                  }}
                >
                  Delete
                </span>
              ),
            },
          ]}
          data={entry}
          mode={"trackEntry"}
          initialState={initialState}
        />
      )}
    </>
  );
}
