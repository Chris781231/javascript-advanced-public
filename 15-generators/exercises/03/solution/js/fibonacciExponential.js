/* eslint-disable linebreak-style */
/* eslint-disable indent */

function* fibonacci() {
    let a = 0;
    let b = 1;
    while (true) {
        yield b;
        [a, b] = [b, a + b];
    }
}

const fibo = fibonacci();

function fibonacciExponential() {
    return fibo.next().value ** 2;
}

export default fibonacciExponential;
