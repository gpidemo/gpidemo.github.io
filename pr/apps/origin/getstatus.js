const gbutton = document.getElementById('getstatus');
const gpleasewait = document.getElementById('gpleasewait');
const sbutton = document.getElementById('setstatus');
const spleasewait = document.getElementById('spleasewait');

var statusChannel = new MessageChannel();
statusChannel.port1.addEventListener ('message',  statusReply());

gbutton.addEventListener('click', (evt) => {
  gbutton.style.display = 'none';
  gpleasewait.style.display = 'block';
  console.log ('Get Status window:' , document.getElementById('uetr').innerHTML)

  navigator.serviceWorker.controller.postMessage(
    {command : 'getstatus', details : document.getElementById('uetr').innerHTML}, 
    [statusChannel.port2]);
});

sbutton.addEventListener('click', (evt) => {
  sbutton.style.display = 'none';
  spleasewait.style.display = 'block';
  console.log ('Set Status window:' , document.getElementById('uetr').innerHTML)
 
  navigator.serviceWorker.controller.postMessage(
    {command : 'setstatus', details : document.getElementById('uetr').innerHTML}, 
    [statusChannel.port2]);
}); 


function statusReply (evt)  {
  if (evt !== null) {
  console.log ('Reply Status event:', evt);
//  console.log ('Reply Status event:', evt.data);
//  document.getElementById('uetr').innerHTML = evt.data.uetr;
//  document.getElementById('status').innerHTML = evt.data.status;
  } else  {
    console.log ('Null statusReply event');
  };
  gbutton.style.display = 'block';
  gpleasewait.style.display = 'none';
  sbutton.style.display = 'block';
  spleasewait.style.display = 'none';
};



const urlParts = window.location.href.split('#');
if (urlParts.length === 3) {
  document.getElementById('uetr').innerHTML = urlParts[1];
  document.getElementById('status').innerHTML = urlParts[2];
};
