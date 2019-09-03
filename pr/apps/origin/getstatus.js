const gbutton = document.getElementById('getstatus');
const gpleasewait = document.getElementById('gpleasewait');
gbutton.addEventListener('click', (evt) => {
  gbutton.style.display = 'none';
  gpleasewait.style.display = 'block';
  console.log ('Get Status window:' , document.getElementById('uetr').innerHTML)
  navigator.serviceWorker.controller.postMessage({command : 'getstatus', details : document.getElementById('uetr').innerHTML});

});

const sbutton = document.getElementById('setstatus');
const spleasewait = document.getElementById('spleasewait');
sbutton.addEventListener('click', (evt) => {
  sbutton.style.display = 'none';
  spleasewait.style.display = 'block';
  console.log ('Set Status window:' , document.getElementById('uetr').innerHTML)
  navigator.serviceWorker.controller.postMessage({command : 'setstatus', details : document.getElementById('uetr').innerHTML});
}); 



    const urlParts = window.location.href.split('#');
if (urlParts.length === 3) {
  document.getElementById('uetr').innerHTML = urlParts[1];
  document.getElementById('status').innerHTML = urlParts[2];
}
