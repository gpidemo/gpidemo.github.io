const gbutton = document.getElementById('getstatus');
const gpleasewait = document.getElementById('spleasewait');
gbutton.addEventListener('click', (evt) => {
  gbutton.style.display = 'none';
  gpleasewait.style.display = 'block';
  console.log ('Get Status window:' , uetr)
  navigator.serviceWorker.controller.postMessage({command : 'getstatus', details : uetr});

});

const sbutton = document.getElementById('setstatus');
const spleasewait = document.getElementById('spleasewait');
sbutton.addEventListener('click', (evt) => {
  sbutton.style.display = 'none';
  spleasewait.style.display = 'block';
  console.log ('Get Status window:' , uetr)
  navigator.serviceWorker.controller.postMessage({command : 'setstatus', details : uetr});
}); 



    const urlParts = window.location.href.split('#');
if (urlParts.length === 3) {
  document.getElementById('uetr').innerHTML = urlParts[1];
  document.getElementById('status').innerHTML = urlParts[2];
}
