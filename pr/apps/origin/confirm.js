
const button = document.getElementById('confirm');
const pleasewait = document.getElementById('pleasewait');
button.addEventListener('click', (evt) => {
  button.style.display = 'none';
  pleasewait.style.display = 'block';
  navigator.serviceWorker.controller.postMessage({command : 'confirm', debitAccount = 0});
});
const urlParts = window.location.href.split('#');
if (urlParts.length === 5) {
  document.getElementById('currency').innerHTML = urlParts[1];
  document.getElementById('value').innerHTML = urlParts[2];
  document.getElementById('debtorName').innerHTML = urlParts[3];
  document.getElementById('debtorAccount').innerHTML = urlParts[4];
}
