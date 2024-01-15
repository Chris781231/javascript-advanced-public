const user = {
  firstName: 'John',
  lastName: 'Doe',
};

// your code
const defaultValue = 'unknown';
const { firstName: f = defaultValue, lastName: l = defaultValue, job: j = defaultValue } = user;

export { l, f, j };
