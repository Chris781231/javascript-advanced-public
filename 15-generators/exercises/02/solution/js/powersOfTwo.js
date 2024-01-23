/* eslint-disable linebreak-style */
/* eslint-disable indent */
function* powersOfTwo() {
    const num = 2;
    let pow = 1;
    while (true) {
        yield num ** pow;
        pow += 1;
    }
}

export default powersOfTwo;
