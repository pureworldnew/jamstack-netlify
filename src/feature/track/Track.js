import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ReactTable } from "components/table";
import { BackDrop } from "components/backdrop";
import * as myConsts from "consts";
import trackApi from "services/track";
import useClockify from "hooks/useClockify";

export default function Track() {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = React.useMemo(() => myConsts.TRACK_COLUMNS, []);

  const getData = () => {
    if (!loading) {
      setLoading(true);
    }
    trackApi.readAll().then((res) => {
      let entryArray = [];
      res.forEach((each) => {
        const { data, ref } = each;
        data["id"] = ref["@ref"]["id"];
        if (data["createDate"] !== undefined) {
          data["createDate"] = new Date(
            data["createDate"]
          ).toLocaleDateString();
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

  const handleClickClockify = () => {
    setLoading(true);
    let workspacePromise = useClockify(
      "https://api.clockify.me/api/v1/workspaces"
    );
    let userPromise = useClockify("https://api.clockify.me/api/v1/user");
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
        useClockify(
          `https://api.clockify.me/api/v1/workspaces/${workspaceId}/user/${userId}/time-entries`
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
                  `https://api.clockify.me/api/v1/workspaces/${workspaceId}/projects/${projectId}`
                );
                projectName = projectDetail.name;
                if (taskId) {
                  let taskDetail = await useClockify(
                    `https://api.clockify.me/api/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
                  );
                  taskName = taskDetail.name;
                }
              }
              if (tagIds?.length) {
                const tagPromises = [];
                tagIds.forEach((tagId) => {
                  let tagPromise = useClockify(
                    `https://api.clockify.me/api/v1/workspaces/${workspaceId}/tags/${tagId}`
                  ).then((detail) => detail.name);
                  tagPromises.push(tagPromise);
                });
                Promise.all(tagPromises).then((res) => {
                  tagName = res.join(",");
                });
              }
              paramArray.push({
                data: {
                  id: each.id,
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
      })
      .catch((err) => console.log(err));
  };

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
