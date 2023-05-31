/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");
const { redisCacheMiddleware } = require("./utils/redisCacheMiddleware");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

const handler = async (event, context) => {
   console.log("Function `track-clockify-meta-read` invoked", event.path);
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   try {
      const { data } = await client.query(
         q.Map(
            q.Paginate(q.Documents(q.Collection("clockify_meta_entries"))),
            q.Lambda((x) => q.Get(x))
         )
      );
      return {
         statusCode: 200,
         body: JSON.stringify(data),
      };
   } catch (err) {
      return {
         statusCode: 500,
         body: JSON.stringify("Something went wrong. Try again later.", err),
      };
   }
};

const wrappedHandler = redisCacheMiddleware(handler);

module.exports.handler = wrappedHandler;
