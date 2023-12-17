const jwt = require("jsonwebtoken");
const { cookie, createRefreshCookie } = require("./createRefreshCookie");

module.exports = function verifyToken(event, userTypeId) {
   const accessToken = event.headers.authorization;
   const { refreshToken } = cookie.parse(event.headers.cookie);
   if (!accessToken && !refreshToken) {
      return {
         status: false,
         resData: {
            statusCode: 401,
            body: JSON.stringify("Access Denied. No token provided."),
         },
      };
   }

   try {
      const token = accessToken.split(" ")[1]; // Remove Bearer from string

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
   } catch (error) {
      if (!refreshToken) {
         return {
            status: false,
            resData: {
               statusCode: 401,
               body: JSON.stringify(
                  "Access Denied. No refresh token provided."
               ),
            },
         };
      }
      try {
         const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
         );
         // For express REST api purpose
         // const accessNewToken = jwt.sign(
         //    { user_id: decoded.user_id, user_type_id: decoded.user_type_id },
         //    process.env.ACCESS_TOKEN_SECRET,
         //    {
         //       expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
         //    }
         // );

         // decoded.accessToken = accessNewToken;

         return {
            status: false,
            resData: {
               statusCode: 401,
               headers: {
                  "Set-Cookie": createRefreshCookie(refreshToken),
                  "Cache-Control": "no-cache",
                  "Content-Type": "text/html",
               },
               body: JSON.stringify(decoded),
            },
         };
      } catch (err) {
         return {
            status: false,
            resData: {
               statusCode: 401,
               body: JSON.stringify("Invalid Token!"),
            },
         };
      }
   }
};
