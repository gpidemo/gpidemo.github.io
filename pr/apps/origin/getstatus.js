const gbutton = document.getElementById('getstatus');
const gpleasewait = document.getElementById('pleasewait');
gbutton.addEventListener('click', (evt) => {
  gbutton.style.display = 'none';
  gpleasewait.style.display = 'block';
  navigator.serviceWorker.controller.postMessage('getstatus');

});

  const sbutton = document.getElementById('setstatus');
  const spleasewait = document.getElementById('pleasewait');
  sbutton.addEventListener('click', (evt) => {
    sbutton.style.display = 'none';
    spleasewait.style.display = 'block';
    navigator.serviceWorker.controller.postMessage('setstatus');
    /*var activeUetr = document.getElementById('uetr').innerHTML;
console.log('Active UETR:', activeUetr);

apiKey = localStorage.getItem("apikey");



fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/payment_initiation/' + activeUetr + '/tracker_status', {
  method: 'GET',
  headers: new Headers({
    "Content-Type": "application/json",
    "x-api-key": methodData.data.apiKey,
    })
  })
  .then((response) => {
    console.log('GetStatus', response);
    if (response.ok) {
      return response.json();
    }
    respond('failure', '');
    })
  .then((jsonResponse) => {
      //console.log(jsonResponse);
      console.log('Body:', jsonResponse);
      console.log('Status UETR:', jsonResponse.uetr);
      document.getElementById('status').innerHTML = jsonResponse.uetr;
    })
  .catch((err) => {
       console.log(err);
       respond('failure', JSON.stringify(err));
    });
*/  
}); 
const urlParts = window.location.href.split('#');
if (urlParts.length === 3) {
  document.getElementById('uetr').innerHTML = urlParts[1];
  document.getElementById('status').innerHTML = urlParts[2];
}
