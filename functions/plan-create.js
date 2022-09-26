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
  if (!data.hasOwnProperty("createDate")) {
    data["createDate"] = new Date().toISOString();
  }
  if (!data.hasOwnProperty("finishedDate")) {
    data["finishedDate"] = new Date().toISOString();
  }
  console.log("Function `plan-create` invoked", data);
  const planItem = {
    data: data,
  };
  console.log("planItem is ", planItem);
  /* construct the fauna query */
  return client
    .query(q.Create(q.Collection("plan_entries"), planItem))
    .then((response) => {
      console.log("plan_entries insertsuccess", response);
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
