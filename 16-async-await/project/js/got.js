/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */

import characters from './characters.js';

const main = document.querySelector('.main');
// const details = document.querySelector('.details');
const charDetails = document.querySelector('.char-details');

const requestUrl = './json/got.json';

const request = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        characters.setCharacters(result);
        await characters.sort();
        characters.characters.forEach((item) => {
            createCharacter(item);
        });
        return result;
    } catch (error) {
        throw Error(error);
    }
};

const createCharacter = (character) => {
    const newChar = document.createElement('div');
    main.appendChild(newChar);
    newChar.addEventListener('click', characterClickHandler);
    newChar.innerHTML = `
        <img class="portrait" src="${character.portrait}" alt="portrait">
        <span class="caption">${character.name}</span>
    `;
};

const characterClickHandler = (event) => {
    const name = event.currentTarget.children[1].textContent;
    const character = characters.findByName(name);
    // details.textContent = character.bio;
    charDetails.innerHTML = `
        <img class="pic" src="${character.picture}" alt="picture">
        <p>
            <span>${character.name}</span><br>
            ${character.alias !== undefined ? `<span style="color: lightblue;"><small>${character.alias}</small></span>` : ''}
            ${character.house !== undefined ? `<img class="house" src="assets/houses/${character.house}.png">` : ''}
            ${character.organization !== undefined ? `<img class="house" src="assets/houses/${character.organization}.png">` : ''}
        </p>
        <p class="bio">
            <span><small>${character.bio}</small></span>
        </p>

    `;
};

request(requestUrl);
