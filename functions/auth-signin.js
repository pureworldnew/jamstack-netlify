/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = async (event, context) => {
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   console.log("Function `auth-signin` invoked", JSON.parse(event.body));
   // Get user input
   const { email, password } = JSON.parse(event.body);

   // Validate user input
   if (!(email && password)) {
      return {
         statusCode: 400,
         body: JSON.stringify("All input is required"),
      };
   }

   // Validate if user exist in our database
   return client
      .query(
         q.Map(
            q.Paginate(q.Match(q.Index("all_user_entries"), email)),
            q.Lambda("user", q.Get(q.Var("user")))
         )
      )
      .then(async (response) => {
         const user = response.data;
         const { ref, ts, data } = user[0];
         console.log("existing user is", ref.id);
         if (
            user.length &&
            (await bcrypt.compareSync(password, data.password))
         ) {
            // Create token
            const token = jwt.sign(
               { user_id: ref.id, email },
               process.env.ACCESS_TOKEN_SECRET,
               {
                  expiresIn: "2h",
               }
            );

            // save user token
            user[0].token = token;

            // user
            return {
               statusCode: 200,
               body: JSON.stringify(user[0]),
            };
         }
         return {
            statusCode: 400,
            body: "Invalid Credentials",
         };
      });
};
