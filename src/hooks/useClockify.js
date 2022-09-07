export default async function useClockify(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": "ZTJkN2JlM2UtNWQ3NS00ZTYyLWJiZWQtYjAyOGVjZDYxNGVl",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
