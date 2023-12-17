/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
const { cookie } = require("./utils/createRefreshCookie");

exports.handler = async (event, context) => {
   const { refreshToken } = cookie.parse(event.headers.cookie);
   if (!refreshToken) {
      return {
         statusCode: 401,
         body: JSON.stringify("Access Denied. No refresh token provided."),
      };
   }

   try {
      const decoded = jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET
      );
      const accessToken = jwt.sign(
         { user_id: decoded.user_id, user_type_id: decoded.user_type_id },
         process.env.ACCESS_TOKEN_SECRET,
         {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
         }
      );

      decoded.accessToken = accessToken;
      return {
         statusCode: 200,
         body: JSON.stringify(decoded),
      };
   } catch (error) {
      return {
         statusCode: 400,
         body: JSON.stringify("Invalid refresh token."),
      };
   }
};
