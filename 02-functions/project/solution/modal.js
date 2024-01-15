/* eslint-disable no-undef */
$('#modal').on('click', (e) => {
  if (e.target === $('#modal')[0]) {
    $('#modal').fadeOut();
    console.log('click');
  }
});

$('#close-btn').on('click', () => {
  $('#modal').fadeOut(100);
});

$('#show-modal-btn').on('click', () => {
  $('#modal').fadeIn(100);
});
