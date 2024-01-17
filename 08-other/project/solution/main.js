const topLayer = document.querySelector('#top-layer');
const descriptionElement = document.querySelector('#description');
const timerElement = document.querySelector('#timer');
const flipCards = document.querySelectorAll('.flip-card');

let images = [
  '335-300x300.jpg',
  '405-150x200.jpg',
  '670-150x200.jpg',
  '772-150x200.jpg',
  '1005-150x200.jpg',
  '335-300x300.jpg',
  '405-150x200.jpg',
  '670-150x200.jpg',
  '772-150x200.jpg',
  '1005-150x200.jpg',
];

let startTime;
let isRunning = false;
let flippedCardCount = 0;
let firstFlippedCard;
let secondFlippedCard;

const mixing = () => {
  const result = [];
  while (images.length > 0) {
    const rndIdx = Math.floor(Math.random() * images.length);
    result.push(images.splice(rndIdx, 1));
  }
  return result;
};

const startTimerLoop = () => {
  const now = new Date().getTime();
  const elapsedTime = new Intl.DateTimeFormat('hu-HU', {
    minute: '2-digit',
    second: '2-digit',
  }).format(now - startTime);
  timerElement.textContent = elapsedTime;
  if (isRunning) setTimeout(startTimerLoop, 1000);
};

const startTimer = () => {
  isRunning = true;
  startTime = new Date().getTime();
  startTimerLoop();
  descriptionElement.textContent = '';
};

const flipCard = (card) => {
  card.classList.add('flip-card-select');
};

const unflipCard = (card) => {
  card.classList.remove('flip-card-select');
};

let shuffledImages = mixing();

const checkPair = () => {
  topLayer.classList.add('top-layer');
  const firstCardBack = firstFlippedCard.lastElementChild.firstElementChild.getAttribute('src');
  const secondCardBack = secondFlippedCard.lastElementChild.firstElementChild.getAttribute('src');
  if (firstCardBack === secondCardBack) {
    flippedCardCount += 2;
    topLayer.classList.remove('top-layer');
  } else {
    const firstCard = firstFlippedCard.parentElement;
    const secondCard = secondFlippedCard.parentElement;
    setTimeout(() => {
      unflipCard(firstCard);
      unflipCard(secondCard);
      topLayer.classList.remove('top-layer');
    }, 2000);
  }
  firstFlippedCard = undefined;
  secondFlippedCard = undefined;
};

const checkWin = () => {
  if (flippedCardCount === shuffledImages.length) {
    isRunning = false;
    descriptionElement.textContent = 'Win';
    topLayer.classList.add('top-layer');
    setTimeout(() => {
      descriptionElement.textContent = '';
      flippedCardCount = 0;
      images = shuffledImages;
      shuffledImages = mixing();
      flipCards.forEach((card, index) => {
        unflipCard(card);
        const cardBackElement = card.firstElementChild.lastElementChild.firstElementChild;
        cardBackElement.setAttribute('src', `./assets/images/${shuffledImages[index]}`);
      });
      topLayer.classList.remove('top-layer');
    }, 5000);
  }
};

const cardEventHandler = (event) => {
  const card = event.target.parentElement.parentElement.parentElement;
  if (card.firstElementChild !== firstFlippedCard) {
    secondFlippedCard = firstFlippedCard;
    firstFlippedCard = event.target.parentElement.parentElement;
    flipCard(card);
  }

  if (firstFlippedCard !== undefined && secondFlippedCard !== undefined) {
    checkPair();
    checkWin();
    return;
  }

  if (isRunning === false) startTimer();
};

flipCards.forEach((card, index) => {
  const cardBackElement = card.firstElementChild.lastElementChild.firstElementChild;
  cardBackElement.setAttribute('src', `./assets/images/${shuffledImages[index]}`);

  card.addEventListener('click', cardEventHandler);
});

const blackBackground = () => {
  document.body.style.backgroundColor = 'black';
};

descriptionElement.addEventListener('click', blackBackground);
// descriptionElement.removeEventListener('click', blackBackground);
