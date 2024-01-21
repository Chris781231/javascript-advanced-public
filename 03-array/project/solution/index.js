/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
const gameContainer = document.querySelector('.game-container');
const label = document.querySelector('#label');
const newGameLayer = document.querySelector('.newgame-layer');

let actualPlayer;
let table = [];

const init = () => {
    setEventListeners();
    newGame();
};

const setEventListeners = () => {
    gameContainer.addEventListener('click', checkCell);
    newGameLayer.addEventListener('click', newGame);
};

const newGame = () => {
    table = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    Array.from(gameContainer.children).forEach((item) => { item.textContent = ''; });

    actualPlayer = Math.floor(Math.random() * 2) + 1;
    label.textContent = `Player ${actualPlayer}'s turn`;

    newGameLayer.classList.remove('show');
};

const checkCell = (event) => {
    const { target } = event;
    const coordinate = convertCoordinate(target);
    if (table[coordinate.x][coordinate.y] === 0) {
        table[coordinate.x][coordinate.y] = actualPlayer;
        target.textContent = actualPlayer === 1 ? 'X' : 'O';
        checkWin();
    }
};

const convertCoordinate = (target) => {
    let x;
    const y = target.id.substring(1) - 1;
    switch (target.id.substring(0, 1)) {
        case 'a':
            x = 0;
            break;
        case 'b':
            x = 1;
            break;
        case 'c':
            x = 2;
            break;
        default:
            x = -1;
            break;
        }
    return { x, y };
};

const checkWin = () => {
    if ((table[0][0] === actualPlayer
            && table[1][0] === actualPlayer
            && table[2][0] === actualPlayer)
        || (table[0][1] === actualPlayer
            && table[1][1] === actualPlayer
            && table[2][1] === actualPlayer)
        || (table[0][2] === actualPlayer
            && table[1][2] === actualPlayer
            && table[2][2] === actualPlayer)
        || (table[0][0] === actualPlayer
            && table[0][1] === actualPlayer
            && table[0][2] === actualPlayer)
        || (table[1][0] === actualPlayer
            && table[1][1] === actualPlayer
            && table[1][2] === actualPlayer)
        || (table[2][0] === actualPlayer
            && table[2][1] === actualPlayer
            && table[2][2] === actualPlayer)
        || (table[0][0] === actualPlayer
            && table[1][1] === actualPlayer
            && table[2][2] === actualPlayer)
        || (table[0][2] === actualPlayer
            && table[1][1] === actualPlayer
            && table[2][0] === actualPlayer)
        ) {
            label.textContent = `Player ${actualPlayer} Wins!`;
            newGameLayer.classList.add('show');
        } else {
            changePlayer();
            checkFullTable();
}
};

const changePlayer = () => {
    actualPlayer = actualPlayer === 1 ? 2 : 1;
    label.textContent = `Player ${actualPlayer}'s turn`;
};

const checkFullTable = () => {
    const isNotFullTable = table.flat().some((item) => item === 0);
    if (isNotFullTable === false) {
        label.textContent = 'Draw!';
        newGameLayer.classList.add('show');
    }
};

init();
