/* Import faunaDB sdk */
const faunadb = require("faunadb");
const getId = require("./utils/getId");
const getDBSecret = require("./utils/getDBSecret");
const q = faunadb.query;

exports.handler = (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: getDBSecret(),
    domain: "db.us.fauna.com",
    scheme: "https",
  });
  const id = getId(event.path);
  console.log(`Function 'todo-read' invoked. Read id: ${id}`);
  return client
    .query(q.Get(q.Ref(`classes/work_entries/${id}`)))
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
