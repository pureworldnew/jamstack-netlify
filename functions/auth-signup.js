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
      // const oldUser = await User.findOne({ email });

      // if (oldUser) {
      //    return res.status(409).send("User Already Exist. Please Login");
      // }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(data.password, salt);
      const userItem = {
         data: { ...data, password: hashPassword },
      };

      console.log("hashPassword", hashPassword);
      /* construct the fauna query */
      return client
         .query(q.Create(q.Collection("user_entries"), userItem))
         .then((response) => {
            console.log("user_entries insertsuccess", response);
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
   } catch (err) {
      console.log(err);
   }
};
