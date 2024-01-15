const user = {
  firstName: 'John',
  lastName: 'Doe',
};

// your code
const defaultvalue = 'unknown';
const { firstName = defaultvalue, lastName = defaultvalue, job = defaultvalue } = user;

export {
  firstName,
  lastName,
  job,
};
