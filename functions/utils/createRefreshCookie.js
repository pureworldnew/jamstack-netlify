const cookie = require("cookie");

const hour = 3600000;
const oneDay = 1 * 24 * hour;

function createRefreshCookie(refreshToken) {
   const refreshCookie = cookie.serialize("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: oneDay,
   });
   return refreshCookie;
}

module.exports = {
   createRefreshCookie,
   cookie,
};
