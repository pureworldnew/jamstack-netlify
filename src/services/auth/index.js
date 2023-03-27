import axios from "axios";

const signUp = (data) =>
   axios({
      method: "post",
      url: "/.netlify/functions/auth-signup",
      data,
   });

const signIn = (data) =>
   axios({ method: "post", url: "/.netlify/functions/auth-signin", data });

const logOut = async () => {
   const response = await fetch(`/.netlify/functions/auth-logout`, {
      body: JSON.stringify(),
      method: "POST",
   });
   return response.json();
};

export default {
   signUp,
   signIn,
   logOut,
};
