const { REACT_APP_CLOCKIFY_API_KEY } = process.env;
export default async function useClockify(url, method) {
  if (method !== "DELETE") {
    return await fetch(url, {
      method: method,
      headers: {
        "X-API-KEY": REACT_APP_CLOCKIFY_API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } else {
    return await fetch(url, {
      method: method,
      headers: {
        "X-API-KEY": REACT_APP_CLOCKIFY_API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => console.log("successfully deleted from fauna"));
  }
}
