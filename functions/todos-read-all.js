/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = (event, context) => {
  console.log("Function `todo-read-all` invoked");
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: getDBSecret(),
    domain: "db.us.fauna.com",
    scheme: "https",
  });
  return client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("work_entries"))),
        q.Lambda((x) => q.Get(x))
      )
    )
    .then((response) => {
      const todoRefs = response.data;
      console.log(`${todoRefs.length} todos found`);
      return {
        statusCode: 200,
        body: JSON.stringify(todoRefs),
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
