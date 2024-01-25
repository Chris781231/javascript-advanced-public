/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
const state = {
    characters: [],

    setCharacters(characters) {
        state.characters = characters;
    },

    findByName(name) {
        return state.characters.find((character) => character.name === name);
    },

    sort() {
        state.characters.sort(alphanumericSort);
    },

    logCharacters() {
        console.log(state.characters);
    },
};

const alphanumericSort = (a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
    return 0;
};

export default state;
