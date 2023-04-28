/* bootstrap database in your FaunaDB account */
const faunadb = require("faunadb");

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
   if (process.env.DEPLOY_PRIME_URL) {
      return true;
   }
   return false;
}

const insideNetlify = insideNetlifyBuildContext();
const q = faunadb.query;
const getDBSecret = require("../functions/utils/getDBSecret");

console.log("env db secret", getDBSecret());
// 1. Check for required enviroment variables
if (!getDBSecret()) {
   //  console.log(
   //     chalk.yellow(
   //        "Required FAUNADB_SERVER_SECRET enviroment variable not found."
   //     )
   //  );
   console.log(
      `Make sure you have created your Fauna databse with "netlify addons:create fauna"`
   );
   console.log(`Then run "npm run bootstrap" to setup your database schema`);
   if (insideNetlify) {
      process.exit(1);
   }
}
/* idempotent operation */
function createFaunaDB(key) {
   console.log("Create the fauna database schema!");
   const client = new faunadb.Client({
      secret: key,
      domain: "db.us.fauna.com",
      scheme: "https",
   });

   /* Based on your requirements, change the schema here */

   const clockifyPromise = client
      .query(q.CreateCollection({ name: "clockify_meta_entries" }))
      .then(() =>
         client.query(
            q.CreateIndex({
               name: "all_clockify_meta_entries",
               source: q.Collection("clockify_meta_entries"),
               values: [{ field: ["data", "workspaceId"] }],
            })
         )
      );
   const workEntryPromise = client
      .query(q.CreateCollection({ name: "work_entries" }))
      .then(() =>
         client.query(
            q.CreateIndex({
               name: "all_work_entries",
               source: q.Collection("work_entries"),
               terms: [{ field: ["data", "directCompany"] }],
            })
         )
      );
   const cashEntryPromise = client
      .query(q.CreateCollection({ name: "cash_entries" }))
      .then(() => {
         const cashByDatePromise = client.query(
            q.CreateIndex({
               name: "all_cash_entries_by_date",
               source: q.Collection("cash_entries"),
               values: [
                  { field: ["data", "createDate"] },
                  { field: ["data", "cashValue"] },
                  { field: ["ref"] },
               ],
            })
         );
         const allCashPromise = client.query(
            q.CreateIndex({
               name: "all_cash_entries",
               source: q.Collection("cash_entries"),
               terms: [{ field: ["data", "element"] }],
            })
         );
         return Promise.all([cashByDatePromise, allCashPromise]);
      });
   const stressEntryPromise = client
      .query(q.CreateCollection({ name: "stress_entries" }))
      .then(() =>
         client.query(
            q.CreateIndex({
               name: "all_stress_entries",
               source: q.Collection("stress_entries"),
               terms: [{ field: ["data", "element"] }],
            })
         )
      );
   const planEntryPromise = client
      .query(q.CreateCollection({ name: "plan_entries" }))
      .then(() => {
         const allPlanEntriesByStatusPromise = client.query(
            q.CreateIndex({
               name: "all_plan_entries_by_planStatus",
               source: q.Collection("plan_entries"),
               terms: [{ field: ["data", "planStatus"] }],
               values: [
                  { field: ["data", "createDate"], reverse: true },
                  { field: ["ref"] },
               ],
            })
         );

         const allPlanEntriesByCreateDatePromise = client.query(
            q.CreateIndex({
               name: "all_plan_entries_by_createDate",
               source: q.Collection("plan_entries"),
               values: [
                  { field: ["data", "createDate"], reverse: true },
                  { field: ["ref"] },
               ],
            })
         );
         return Promise.all([
            allPlanEntriesByStatusPromise,
            allPlanEntriesByCreateDatePromise,
         ]);
      });
   const timeEntryPromise = client
      .query(q.CreateCollection({ name: "track_entries" }))
      .then(() => {
         const trackSortByEndPromise = client.query(
            q.CreateIndex({
               name: "track_sort_by_end",
               source: q.Collection("track_entries"),
               values: [
                  { field: ["data", "end"], reverse: true },
                  { field: ["data", "timeEntryId"] },
                  { field: ["ref"] },
               ],
            })
         );

         const trackSearchByTimeEntryIdPromise = client.query(
            q.CreateIndex({
               name: "track_search_by_timeEntryId",
               source: q.Collection("track_entries"),
               terms: [{ field: ["data", "timeEntryId"] }],
            })
         );

         return Promise.all([
            trackSortByEndPromise,
            trackSearchByTimeEntryIdPromise,
         ]);
      });
   const userEntryPromise = client
      .query(q.CreateCollection({ name: "user_entries" }))
      .then(() =>
         client.query(
            q.CreateIndex({
               name: "all_user_entries",
               source: q.Collection("user_entries"),
               terms: [
                  {
                     field: ["data", "email"],
                  },
               ],
            })
         )
      );

   const allPromises = [
      clockifyPromise,
      workEntryPromise,
      planEntryPromise,
      timeEntryPromise,
      cashEntryPromise,
      stressEntryPromise,
      userEntryPromise,
   ];

   return Promise.allSettled(allPromises)
      .then((values) => console.log(values))
      .catch((e) => {
         console.log(e);
         // Database already exists
         if (
            e.requestResult.statusCode === 400 &&
            e.message === "instance not unique"
         ) {
            console.log("Fauna already setup! Good to go");
            console.log(
               'Claim your fauna database with "netlify addons:auth fauna"'
            );
            throw e;
         }
      });
}

// Has var. Do the thing
if (getDBSecret()) {
   createFaunaDB(getDBSecret()).then(() => {
      console.log("Fauna Database schema has been created");
      console.log('Claim your fauna database with "netlify addons:auth fauna"');
   });
}
