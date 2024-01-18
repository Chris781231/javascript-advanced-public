const setCookie = (str) => {
  const expirationMinutes = 15;
  const now = new Date();
  now.setMinutes(now.getMinutes() + expirationMinutes);
  const expires = now.toUTCString();
  document.cookie = `token=${str}; expires=${expires}; path=/`;
};

export default setCookie;
