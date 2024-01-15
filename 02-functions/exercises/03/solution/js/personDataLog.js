const personDataLog = ({ firstName = 'John', lastName = 'Doe', age = 33 } = {}) => `My name is ${firstName} ${lastName}. I'm ${age} years old.`;

export default personDataLog;
