import api from "services/api";

const signUp = (data) =>
   api({
      method: "post",
      url: "/.netlify/functions/auth-signup",
      data,
   });

const signIn = (data) =>
   api({ method: "post", url: "/.netlify/functions/auth-signin", data });

const logOut = async () => {
   const response = await fetch(`/.netlify/functions/auth-logout`, {
      body: JSON.stringify(),
      method: "POST",
   });
   return response.json();
};

const updateProfile = async (data) => {
   console.log("data updateProfile", data);
   const response = await api({
      method: "post",
      url: "/.netlify/functions/profile-info-update",
      data,
   });
   return response.data;
};
const getProfile = async () => {
   const response = await api.get("/.netlify/functions/profile-get");
   return response.data;
};

export default {
   signUp,
   signIn,
   logOut,
   updateProfile,
   getProfile,
};
