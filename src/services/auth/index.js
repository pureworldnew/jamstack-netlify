const signUp = async (data) => {
  const response = await fetch("/.netlify/functions/auth-signup", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const signIn = async () => {
  const response = await fetch("/.netlify/functions/auth-signin");
  return await response.json();
};

const logOut = async () => {
  const response = await fetch(`/.netlify/functions/auth-logout`, {
    body: JSON.stringify(),
    method: "POST",
  });
  return await response.json();
};

export default {
  signUp,
  signIn,
  logOut,
};
