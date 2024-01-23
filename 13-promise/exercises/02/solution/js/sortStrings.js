/* eslint-disable linebreak-style */
/* eslint-disable indent */
const sortStrings = (arr) => new Promise((resolve, reject) => {
        // setTimeout(() => {
            const isStringArray = Array.from(arr).every((item) => typeof item === 'string');
            if (isStringArray) {
                try {
                    resolve(arr.sort());
                } catch (error) {
                    reject(Error('Error: Something went wrong with sorting words!'));
                }
            } else {
                reject(Error('Error: Not all items in the array are strings!'));
            }
        // });
    });

export default sortStrings;
