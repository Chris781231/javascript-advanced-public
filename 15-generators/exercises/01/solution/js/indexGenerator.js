/* eslint-disable linebreak-style */
/* eslint-disable indent */
function* indexGenerator() {
    let id = 1;
    while (true) {
        yield id;
        id += 1;
    }
}

export default indexGenerator;
