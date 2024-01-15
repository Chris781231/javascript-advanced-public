let actualPlayer;
let table;
let isRunning = false;

const gameContainer = document.querySelector('.game-container');
Array.from(gameContainer.children).forEach((item) =>
  item.addEventListener('click', (event) => {
    onclickHandler(event.target);
  })
);

const label = document.querySelector('#label');
const newGameLayer = document.querySelector('.newgame-layer');
newGameLayer.addEventListener('click', () => {
  init();
});

init();

function onclickHandler(target) {
  checkCell(target);
}

function init() {
  table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  Array.from(gameContainer.children).forEach((item) => {
    item.textContent = '';
  });
  actualPlayer = Math.floor(Math.random() * 2) + 1;
  labelHandler();
  newGameLayer.classList.remove('show');
}

function labelHandler(text) {
  const labelContent = text || `Player ${actualPlayer}'s turn`;
  label.textContent = labelContent;
}

function convertCoordinate(target) {
  let x;
  let y = target.id.substring(1) - 1;
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
  return { xCoord: x, yCoord: y };
}

function changePlayer() {
  actualPlayer = actualPlayer === 1 ? 2 : 1;
  labelHandler();
}

function checkCell(target) {
  const coordinate = convertCoordinate(target);
  if (table[coordinate.xCoord][coordinate.yCoord] === 0) {
    table[coordinate.xCoord][coordinate.yCoord] = actualPlayer;
    target.textContent = actualPlayer === 1 ? 'X' : 'O';
    checkWin();
  }
}

function checkWin() {
  if (
    (table[0][0] === actualPlayer &&
      table[1][0] === actualPlayer &&
      table[2][0] === actualPlayer) ||
    (table[0][1] === actualPlayer &&
      table[1][1] === actualPlayer &&
      table[2][1] === actualPlayer) ||
    (table[0][2] === actualPlayer &&
      table[1][2] === actualPlayer &&
      table[2][2] === actualPlayer) ||
    (table[0][0] === actualPlayer &&
      table[0][1] === actualPlayer &&
      table[0][2] === actualPlayer) ||
    (table[1][0] === actualPlayer &&
      table[1][1] === actualPlayer &&
      table[1][2] === actualPlayer) ||
    (table[2][0] === actualPlayer &&
      table[2][1] === actualPlayer &&
      table[2][2] === actualPlayer) ||
    (table[0][0] === actualPlayer &&
      table[1][1] === actualPlayer &&
      table[2][2] === actualPlayer) ||
    (table[0][2] === actualPlayer &&
      table[1][1] === actualPlayer &&
      table[2][0] === actualPlayer)
  ) {
    labelHandler(`Player ${actualPlayer} Wins!`);
    newGameLayer.classList.add('show');
  } else {
    changePlayer();
    checkFullTable();
  }
}

function checkFullTable() {
  tableArray = Array.from(table);
  const isNotFullTable = tableArray.flat().some((item) => item === 0);
  if (isNotFullTable === false) {
    labelHandler('Draw!');
    newGameLayer.classList.add('show');
  }
}
