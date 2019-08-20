const sbutton = document.getElementById('getstatus');
const spleasewait = document.getElementById('pleasewait');
sbutton.addEventListener('click', (evt) => {
  sbutton.style.display = 'none';
  spleasewait.style.display = 'block';
  navigator.serviceWorker.controller.postMessage('getstatus');
});
const urlParts = window.location.href.split('#');
if (urlParts.length === 2) {
  document.getElementById('uetr').innerHTML = urlParts[1];
}
