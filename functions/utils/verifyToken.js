const jwt = require("jsonwebtoken");

module.exports = function verifyToken(tokenValue, userTypeId) {
   if (!tokenValue) {
      return {
         status: false,
         resData: {
            statusCode: 401,
            body: JSON.stringify("Access Denied / Unauthorized request"),
         },
      };
   }
   try {
      const token = tokenValue.split(" ")[1]; // Remove Bearer from string
      if (token === "null" || !token) {
         return {
            status: false,
            resData: {
               statusCode: 401,
               body: JSON.stringify("Unauthorized request"),
            },
         };
      }
      const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!verifiedUser) {
         return {
            status: false,
            resData: {
               statusCode: 401,
               body: JSON.stringify("Unauthorized request"),
            },
         };
      }
      if (verifiedUser.user_type_id < userTypeId) {
         return {
            status: false,
            resData: {
               statusCode: 401,
               body: JSON.stringify("Permission denied: Unauthorized!"),
            },
         };
      }
      return {
         status: true,
         resData: verifiedUser,
      };
   } catch (err) {
      console.log("err status of jwt verified", err);
      return {
         status: false,
         resData: {
            statusCode: 400,
            body: JSON.stringify("Invalid Token"),
         },
      };
   }
};
