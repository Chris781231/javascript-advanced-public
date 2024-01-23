/* eslint-disable linebreak-style */
/* eslint-disable indent */
const convertToUppercase = (arr) => new Promise((resolve, reject) => {
    try {
        resolve(arr.map((item) => item.toLocaleUpperCase()));
    } catch (error) {
        reject(new Error('Error: Not all items in the array are strings!'));
    }
});

export default convertToUppercase;
