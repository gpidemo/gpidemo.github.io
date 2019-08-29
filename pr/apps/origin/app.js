self.method = null;
self.resolver = null;
var methodData = null;
var apikeyString = null;

self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

function respond(statusString, uetrString) {
  self.resolver({
    methodName: self.method,
    details: {
      status: statusString,
      uetr: uetrString,
    },
  });
  self.resolver = null;
}

self.addEventListener('message', (evt) => {
  if (evt.data === 'confirm' && self.resolver !== null) {
    console.log(methodData)
 //   var fs = require ('fs')
 //   var apikeyString = fs.readFileSync('file:C:/NoBackup/W3CDemo/api_key.txt').toString();
 //   console.log(apikeyString);

    apikeyString = window.localStorage.getItem("apikey");
    fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/payment_initiation', {
        method: 'POST',
        body: JSON.stringify(methodData.data.creditTransferData),
        headers: new Headers({
          "x-api-key": apikeyString,
          })
        })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json;
          }
          respond('failure', '');
          })
        .then((jsonResponse) => {
            console.log(jsonResponse);
            respond('success', methodData.data.uetr);
          })
        .catch((err) => {
             console.log(err);
             respond('failure', JSON.stringify(err));
          });
  } else {
    console.log('Unrecognized message: ' + evt.data);
  }
});



self.addEventListener('paymentrequest', (evt) => {
  console.log(evt)
  self.method = evt.methodData[0].supportedMethods;
  evt.respondWith(new Promise((resolve, reject) => {
    self.resolver = resolve;
    methodData = evt.methodData[0];

    console.log(methodData)
 //   var fs = require ('fs')
 //   var apikeyString = fs.readFileSync('file:C:/NoBackup/W3CDemo/api_key.txt').toString();
 //   console.log(apikeyString);

/*    fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/payment_initiation', {
        method: 'POST',
        body: JSON.stringify(methodData.data.creditTransferData),
        headers: new Headers({
          "x-api-key": '',
          })
        })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json;
          }
          respond('failure', '');
          })
        .then((jsonResponse) => {
            console.log(jsonResponse);
            respond('success', methodData.data.uetr);
          })
        .catch((err) => {
             console.log(err);
             respond('failure', JSON.stringify(err));
          });
*/

    evt.openWindow('confirm.html#' + evt.total.currency + '#' + evt.total.value + '#' + evt.methodData[0].data.creditTransferData.debtorName + '#' + evt.methodData[0].data.creditTransferData.debtorAccount);
  }));
});

