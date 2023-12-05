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
   const id = getId(event.path);
   const data = JSON.parse(event.body);
   console.log(
      `Function work-update invoked. Data Passed: ${JSON.stringify(
         data
      )}, id: ${id}`
   );
   if (!Object.prototype.hasOwnProperty.call(data, "createDate")) {
      data.createDate = new Date().toISOString();
   } else {
      data.createDate = new Date(data.createDate).toISOString();
   }
   return client
      .query(q.Update(q.Ref(`classes/work_entries/${id}`), { data }))
      .then((response) => ({ statusCode: 200, body: JSON.stringify(response) }))
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
