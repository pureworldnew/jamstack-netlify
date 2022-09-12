/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = (event, context) => {
  console.log("Function `clockify-read-all` invoked");
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: getDBSecret(),
    domain: "db.us.fauna.com",
    scheme: "https",
  });
  return client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("clockify_meta_entries"))),
        q.Lambda((x) => q.Get(x))
      )
    )
    .then((response) => {
      const clockifyMetaRefs = response.data;
      console.log(`${clockifyMetaRefs.length} clockify meta found`);
      return {
        statusCode: 200,
        body: JSON.stringify(clockifyMetaRefs),
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
