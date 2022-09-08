/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/track-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    console.log("response", response);
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/track-read-all").then((response) => {
    return response.json();
  });
};

export default {
  create,
  readAll,
};
