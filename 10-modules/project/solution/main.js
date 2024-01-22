/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
import images from './db.js';

const cont = document.querySelector('#slides');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsElement = document.querySelector('#dots');
let dots;
let slides;

let slideShow;
let slideIndex = 1;

const init = () => {
    images.forEach((image, index) => createSlide(image, index));
    createDots(images.length);
    setListeners();
    showSlides(slideIndex);
};

const setListeners = () => {
    prev.addEventListener('click', plusSlides);
    next.addEventListener('click', plusSlides);
    dots.forEach(((dot, index) => {
        dot.addEventListener('click', () => {
            clearTimeout(slideShow);
            currentSlide(index + 1);
        });
    }));
};

const plusSlides = (event) => {
    clearTimeout(slideShow);
    const direction = parseInt(event.target.getAttribute('data-direction'), 10);
    showSlides(slideIndex += direction);
};

// Thumbnail image controls
const currentSlide = (n) => {
  showSlides(slideIndex = n);
};

const showSlides = (n = slideIndex, timer = 2000) => {
  let i;
  slides = document.querySelectorAll('.mySlides');
  dots = document.querySelectorAll('.dot');
  console.log(slides, dots);
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i += 1) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i += 1) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
  slideShow = setTimeout(beforeNextSlide, timer);
};

const beforeNextSlide = () => {
    slideIndex += 1;
    if (slideIndex > slides.length) slideIndex = 1;
    showSlides();
};

const createSlide = (image, index) => {
    cont.innerHTML += `
        <div class="mySlides fade">
            <div class="numbertext">${index + 1} / ${images.length}</div>
            <img src="${image.src}" style="width:100%">
            <div class="text">${image.caption}</div>
        </div>
    `;
};

const createDots = (count) => {
    dotsElement.innerHTML = '<span class="dot"></span>'.repeat(count);
    dots = document.querySelectorAll('.dot');
};

init();
