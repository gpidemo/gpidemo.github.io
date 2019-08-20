const button = document.getElementById('getstatus');
const pleasewait = document.getElementById('pleasewait');
button.addEventListener('click', (evt) => {
  button.style.display = 'none';
  pleasewait.style.display = 'block';
  navigator.serviceWorker.controller.postMessage('getstatus');
});
const urlParts = window.location.href.split('#');
if (urlParts.length === 2) {
  document.getElementById('uetr').innerHTML = urlParts[1];
}
