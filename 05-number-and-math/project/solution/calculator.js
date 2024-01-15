let input = '0';
let operator = null;
let result = 0;
let firstTouch = true;

/* Calculator elements */

// Result display
const resultDisplay = document.querySelector('#result-display');

// Operation buttons
const addBtn = document.querySelector('#add-btn');
const subtractBtn = document.querySelector('#subtract-btn');
const multiplyBtn = document.querySelector('#multiply-btn');
const divideBtn = document.querySelector('#divide-btn');

// Number buttons
const nineBtn = document.querySelector('#nine');
const eightBtn = document.querySelector('#eight');
const sevenBtn = document.querySelector('#seven');
const sixBtn = document.querySelector('#six');
const fiveBtn = document.querySelector('#five');
const fourBtn = document.querySelector('#four');
const threeBtn = document.querySelector('#three');
const twoBtn = document.querySelector('#two');
const oneBtn = document.querySelector('#one');
const zeroBtn = document.querySelector('#zero');

// Other buttons
const decPointBtn = document.querySelector('#dec-point');
const clearBtn = document.querySelector('#clear');
const equalBtn = document.querySelector('#equal-btn');

/* EventListeners */

// Matematical functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const calculate = (num1, num2, operate) => operate(num1, num2);

function processOperatorBtnClick(isEqualBtn = false) {
  result = operator == null
    ? parseFloat(input)
    : calculate(result, parseFloat(input), operator);

  resultDisplay.textContent = result;
  firstTouch = true;
  if (!isEqualBtn) input = '0';
}

function processClickEvent(btn) {
  switch (btn) {
    case 0:
      if (firstTouch) input = '0';
      input = input === '0' ? '0' : input + btn;
      resultDisplay.textContent = input;
      firstTouch = false;
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      if (firstTouch) input = '0';
      input = input === '0' ? `${btn}` : input + btn;
      resultDisplay.textContent = input;
      firstTouch = false;
      break;
    case 'C':
      input = '0';
      result = 0;
      resultDisplay.textContent = 0;
      operator = null;
      firstTouch = true;
      break;
    case '.':
      if (input.includes('.')) return;
      input += '.';
      resultDisplay.textContent = input;
      firstTouch = false;
      break;
    case '+':
      processOperatorBtnClick();
      operator = add;
      break;
    case '-':
      processOperatorBtnClick();
      operator = subtract;
      break;
    case '*':
      processOperatorBtnClick();
      operator = multiply;
      break;
    case '/':
      processOperatorBtnClick();
      operator = divide;
      break;
    case '=':
      processOperatorBtnClick(true);
      break;
    default:
      break;
  }
}

// Operation buttons
addBtn.addEventListener('click', () => processClickEvent('+'));
subtractBtn.addEventListener('click', () => processClickEvent('-'));
multiplyBtn.addEventListener('click', () => processClickEvent('*'));
divideBtn.addEventListener('click', () => processClickEvent('/'));

// Number buttons
nineBtn.addEventListener('click', () => processClickEvent(9));
eightBtn.addEventListener('click', () => processClickEvent(8));
sevenBtn.addEventListener('click', () => processClickEvent(7));
sixBtn.addEventListener('click', () => processClickEvent(6));
fiveBtn.addEventListener('click', () => processClickEvent(5));
fourBtn.addEventListener('click', () => processClickEvent(4));
threeBtn.addEventListener('click', () => processClickEvent(3));
twoBtn.addEventListener('click', () => processClickEvent(2));
oneBtn.addEventListener('click', () => processClickEvent(1));
zeroBtn.addEventListener('click', () => processClickEvent(0));

// Other buttons
decPointBtn.addEventListener('click', () => processClickEvent('.'));
clearBtn.addEventListener('click', () => processClickEvent('C'));
equalBtn.addEventListener('click', () => processClickEvent('='));
