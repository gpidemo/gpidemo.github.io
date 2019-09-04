const gbutton = document.getElementById('getstatus');
const gpleasewait = document.getElementById('gpleasewait');
const sbutton = document.getElementById('setstatus');
const spleasewait = document.getElementById('spleasewait');

//var getstatusChannel = new MessageChannel();
//getstatusChannel.port1.onmessage = statusReply();

//var setstatusChannel = new MessageChannel();
//setstatusChannel.port1.onmessage = statusReply();


gbutton.addEventListener('click', (evt) => {
  gbutton.style.display = 'none';
  gpleasewait.style.display = 'block';
  console.log ('Get Status window:' , document.getElementById('uetr').innerHTML)

  //  navigator.serviceWorker.controller.postMessage(
  //    {command : 'getstatus', details : document.getElementById('uetr').innerHTML}, 
  //    [getstatusChannel.port2]);
  sendMessage({command : 'getstatus', details : document.getElementById('uetr').innerHTML});

});

sbutton.addEventListener('click', (evt) => {
  sbutton.style.display = 'none';
  spleasewait.style.display = 'block';
  console.log ('Set Status window:' , document.getElementById('uetr').innerHTML)
 
  // navigator.serviceWorker.controller.postMessage(
  //  {command : 'setstatus', details : document.getElementById('uetr').innerHTML}, 
  //   [setstatusChannel.port2]);
  sendMessage({command : 'setstatus', details : document.getElementById('uetr').innerHTML});

}); 

function sendMessage(message) {
  // This wraps the message posting/response in a promise, which will
  // resolve if the response doesn't contain an error, and reject with
  // the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler
  // independently of a promise, but this is a convenient wrapper.
  return new Promise(function(resolve, reject) {
    var statusChannel = new MessageChannel();
    statusChannel.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        console.log ('Promise resolve: ', event.data);
        statusUpdate (event);
        resolve(event.data);
      }
    };
    navigator.serviceWorker.controller.postMessage(message, [statusChannel.port2]);
  });
};





function statusUpdate (evt)  {
  console.log ('Reply Status event:', evt);
  document.getElementById('uetr').innerHTML = evt.data.uetr;
  document.getElementById('status').innerHTML = evt.data.status;
  gbutton.style.display = 'block';
  gpleasewait.style.display = 'none';
  sbutton.style.display = 'block';
  spleasewait.style.display = 'none';
};

function statusReply (evt)  {
  if ((evt !== null) && (evt !== undefined)) {
  console.log ('Reply Status event:', evt);
//  console.log ('Reply Status event:', evt.data);
    document.getElementById('uetr').innerHTML = evt.data.uetr;
    document.getElementById('status').innerHTML = evt.data.status;
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
