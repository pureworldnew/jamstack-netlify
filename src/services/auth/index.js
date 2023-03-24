const signUp = async (data) => {
   const response = await fetch("/.netlify/functions/auth-signup", {
      body: JSON.stringify(data),
      method: "POST",
   });
   return response.json();
};

const signIn = async () => {
   const response = await fetch("/.netlify/functions/auth-signin");
   return response.json();
};

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
