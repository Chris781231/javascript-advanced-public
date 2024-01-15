const clockHolder = document.querySelector('#clockHolder');

const clockHandler = () => {
  clockHolder.textContent = new Date().toLocaleTimeString('hu-HU');
  setTimeout(() => clockHandler(), 1000);
};

clockHandler();
