/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: getDBSecret(),
    domain: "db.us.fauna.com",
    scheme: "https",
  });
  const data = JSON.parse(event.body);
  console.log("Function `stress-delete-batch` invoked", data.ids);
  // construct batch query from IDs
  const deleteAllCompletedStressQuery = data.ids.map((id) => {
    return q.Delete(q.Ref(`classes/stress_entries/${id}`));
  });
  // Hit fauna with the query to delete the completed items
  return client
    .query(deleteAllCompletedStressQuery)
    .then((response) => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
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
