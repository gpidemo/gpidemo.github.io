const gbutton = document.getElementById('getstatus');
const gpleasewait = document.getElementById('spleasewait');
gbutton.addEventListener('click', (evt) => {
  gbutton.style.display = 'none';
  gpleasewait.style.display = 'block';
  navigator.serviceWorker.controller.postMessage('getstatus');

});

const sbutton = document.getElementById('setstatus');
const spleasewait = document.getElementById('spleasewait');
sbutton.addEventListener('click', (evt) => {
  sbutton.style.display = 'none';
  spleasewait.style.display = 'block';
  navigator.serviceWorker.controller.postMessage('setstatus');
}); 



    const urlParts = window.location.href.split('#');
if (urlParts.length === 3) {
  document.getElementById('uetr').innerHTML = urlParts[1];
  document.getElementById('status').innerHTML = urlParts[2];
}
