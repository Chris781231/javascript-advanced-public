const cookieHandler = {
  getAll() {
    const cookies = document.cookie.split('; ');
    const result = {};
    cookies.forEach((cookie) => {
      const cookieArray = cookie.split('=');
      // eslint-disable-next-line prefer-destructuring
      result[cookieArray[0]] = cookieArray[1];
    });
    return result;
  },
  toSessionStorage() {
    const cookies = this.getAll();
    Object.entries(cookies).forEach(([key, value]) => {
      sessionStorage.setItem(key, value);
    });
  },
  flush() {
    const cookies = this.getAll();
    Object.keys(cookies).forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  },
};

export default cookieHandler;
