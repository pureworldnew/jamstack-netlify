import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

const { REACT_APP_GOOGLE_ANALYTICS_ID } = process.env;
console.log("REACT_APP_GOOGLE_ANALYTICS_ID", REACT_APP_GOOGLE_ANALYTICS_ID);
let plugins = [];
// If google analytics ID set attach plugin
if (REACT_APP_GOOGLE_ANALYTICS_ID) {
   plugins = [
      googleAnalytics({
         trackingId: REACT_APP_GOOGLE_ANALYTICS_ID,
      }),
   ];
}

export default Analytics({
   app: "fauna-db-example",
   plugins,
});
