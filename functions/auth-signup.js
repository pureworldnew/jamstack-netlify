/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDBSecret = require("./utils/getDBSecret");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   try {
      /* configure faunaDB Client with our secret */
      const client = new faunadb.Client({
         secret: getDBSecret(),
         domain: "db.us.fauna.com",
         scheme: "https",
      });
      /* parse the string body into a useable JS object */
      const data = JSON.parse(event.body);
      console.log("Function `auth-signup` invoked", data);

      const { firstName, lastName, email, password } = data;

      // Validate user input
      if (!(email && password && firstName && lastName)) {
         return {
            statusCode: 400,
            body: "All input is required",
         };
      }

      // check if user already exist
      // Validate if user exist in our database
      return client
         .query(
            q.Map(
               q.Paginate(q.Match(q.Index("all_user_entries"), email)),
               q.Lambda("user", q.Get(q.Var("user")))
            )
         )
         .then(async (response) => {
            console.log("response", response.data);
            const oldUser = response.data;
            if (oldUser.length) {
               return {
                  statusCode: 409,
                  body: "User Already Exist. Please Login",
               };
            }
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(data.password, salt);
            const userItem = {
               data: { ...data, password: hashPassword },
            };

            console.log("hashPassword", hashPassword);
            /* construct the fauna query */
            return client
               .query(q.Create(q.Collection("user_entries"), userItem))
               .then((res) => {
                  console.log("user_entries insertsuccess", res);
                  /* Success! return the res with statusCode 200 */
                  return {
                     statusCode: 201,
                     body: JSON.stringify(res),
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
         })
         .catch((err) => console.log(err));
   } catch (err) {
      return {
         statusCode: 400,
         body: JSON.stringify(err),
      };
   }
};
