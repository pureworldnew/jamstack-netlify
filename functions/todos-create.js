/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");
/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: getDBSecret(),
    domain: "db.us.fauna.com",
    scheme: "https",
  });
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  console.log("Function `todo-create` invoked", data);
  const todoItem = {
    data: data,
  };
  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref("classes/work_entries"), todoItem))
    .then((response) => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
