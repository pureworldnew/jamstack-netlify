const { REACT_APP_CLOCKIFY_API_KEY } = process.env;
export default function useClockify(url, method) {
   if (method !== "DELETE") {
      return fetch(url, {
         method,
         headers: {
            "X-API-KEY": REACT_APP_CLOCKIFY_API_KEY,
            Accept: "application/json",
            "Content-Type": "application/json",
         },
      }).then((res) => res.json());
   }
   return fetch(url, {
      method,
      headers: {
         "X-API-KEY": REACT_APP_CLOCKIFY_API_KEY,
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   }).then(() => console.log("successfully deleted from fauna"));
}
