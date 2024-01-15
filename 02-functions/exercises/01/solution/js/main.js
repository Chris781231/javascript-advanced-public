// eslint-disable-next-line no-unused-vars
const handleClick = () => {
  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => {
      // eslint-disable-next-line no-console
      console.log(button.innerHTML);
    });
  });
};
