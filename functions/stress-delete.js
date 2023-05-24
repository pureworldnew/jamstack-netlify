/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");
const getId = require("./utils/getId");
const getDBSecret = require("./utils/getDBSecret");

const q = faunadb.query;

exports.handler = async (event, context) => {
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   const id = getId(event.path);
   console.log(`Function 'stress-delete' invoked. delete id: ${id}`);
   return client
      .query(q.Delete(q.Ref(`classes/stress_entries/${id}`)))
      .then((response) => ({
         statusCode: 200,
         body: JSON.stringify(response),
      }))
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
