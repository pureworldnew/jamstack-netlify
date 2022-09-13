/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = (event, context) => {
  console.log("Function `track-read-all` invoked");
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: getDBSecret(),
    domain: "db.us.fauna.com",
    scheme: "https",
  });
  return client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("track_entries"))),
        q.Lambda((x) => q.Get(x))
      )
    )
    .then((response) => {
      const trackRefs = response.data;
      console.log(`${trackRefs.length} Tracks found`);
      return {
        statusCode: 200,
        body: JSON.stringify(trackRefs),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
