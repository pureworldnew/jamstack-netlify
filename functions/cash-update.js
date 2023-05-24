/* eslint-disable no-unused-vars */
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
   const data = JSON.parse(event.body);
   const id = getId(event.path);
   console.log(`Function 'cash-update' invoked. update id: ${id}`);
   data.createDate = q.Date(data.createDate.split("T")[0]);
   return client
      .query(q.Update(q.Ref(`classes/cash_entries/${id}`), { data }))
      .then((response) => ({
         statusCode: 200,
         body: JSON.stringify(response),
      }))
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
