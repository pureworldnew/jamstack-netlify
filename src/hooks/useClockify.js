export default async function useClockify(url, method) {
  if (method !== "DELETE") {
    return await fetch(url, {
      method: method,
      headers: {
        "X-API-KEY": "ZTJkN2JlM2UtNWQ3NS00ZTYyLWJiZWQtYjAyOGVjZDYxNGVl",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } else {
    return await fetch(url, {
      method: method,
      headers: {
        "X-API-KEY": "ZTJkN2JlM2UtNWQ3NS00ZTYyLWJiZWQtYjAyOGVjZDYxNGVl",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => console.log("successfully deleted from fauna"));
  }
}
