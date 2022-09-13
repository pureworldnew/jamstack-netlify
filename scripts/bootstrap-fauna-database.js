/* bootstrap database in your FaunaDB account */
const faunadb = require("faunadb");
const chalk = require("chalk");
const insideNetlify = insideNetlifyBuildContext();
const q = faunadb.query;
const getDBSecret = require("../functions/utils/getDBSecret");

console.log(chalk.cyan("Creating your FaunaDB Database...\n"));
console.log("env db secret", getDBSecret());
// 1. Check for required enviroment variables
if (!getDBSecret()) {
  console.log(
    chalk.yellow(
      "Required FAUNADB_SERVER_SECRET enviroment variable not found."
    )
  );
  console.log(
    `Make sure you have created your Fauna databse with "netlify addons:create fauna"`
  );
  console.log(`Then run "npm run bootstrap" to setup your database schema`);
  if (insideNetlify) {
    process.exit(1);
  }
}

// Has var. Do the thing
if (getDBSecret()) {
  createFaunaDB(getDBSecret()).then(() => {
    console.log("Fauna Database schema has been created");
    console.log('Claim your fauna database with "netlify addons:auth fauna"');
  });
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
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: "all_clockify_meta_entries",
          source: q.Collection("clockify_meta_entries"),
          values: [{ field: ["data", "workspaceId"] }],
        })
      );
    });

  const workEntryPromise = client
    .query(q.CreateCollection({ name: "work_entries" }))
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: "all_work_entries",
          source: q.Collection("work_entries"),
          values: [{ field: ["data", "directCompany"] }],
        })
      );
    });

  const cashEntryPromise = client
    .query(q.CreateCollection({ name: "cash_entries" }))
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: "all_cash_entries",
          source: q.Collection("cash_entries"),
          terms: [{ field: ["data", "element"] }],
        })
      );
    });
  const stressEntryPromise = client
    .query(q.CreateCollection({ name: "stress_entries" }))
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: "all_stress_entries",
          source: q.Collection("stress_entries"),
          terms: [{ field: ["data", "element"] }],
        })
      );
    });

  const planEntryPromise = client
    .query(q.CreateCollection({ name: "plan_entries" }))
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: "all_plan_entries",
          source: q.Collection("plan_entries"),
          terms: [{ field: ["data", "element"] }],
          values: [{ field: ["data", "name"] }],
        })
      );
    });

  const timeEntryPromise = client
    .query(q.CreateCollection({ name: "track_entries" }))
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: "all_track_entries",
          source: q.Collection("track_entries"),
          values: [{ field: ["data", "timeEntryId"] }, { field: ["ref"] }],
        })
      );
    });

  const allPromises = [
    clockifyPromise,
    workEntryPromise,
    planEntryPromise,
    timeEntryPromise,
    cashEntryPromise,
    stressEntryPromise,
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

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true;
  }
  return false;
}
