self.method = null;
self.resolver = null;

self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('message', (evt) => {
  if (evt.data === 'confirm' && self.resolver !== null) {

    console.log(evt.methodData)
 /*
fetch('https://gpilinkmanual.swiftlabapis.com/payment-initiation', {
  method: 'POST',
  body: evt.methodData[0].data.creditTransferData,
  headers: {
    "x-api-key": ""
  }
})
.then((response) => {
  console.log(response)
  return response.json
})
.catch(err => console.error(err))
*/

    self.resolver({
      methodName: self.method,
      details: {        	
        uetr: '972a99ab-46e8-4fbd-ae6e-77cf56909dc2',
      },
    });
    self.resolver = null;
  } else {
    console.log('Unrecognized message: ' + evt.data);
  }
});



self.addEventListener('paymentrequest', (evt) => {
  self.method = evt.methodData[0].supportedMethods;
  evt.respondWith(new Promise((resolve, reject) => {
    self.resolver = resolve;
    evt.openWindow('confirm.html#' + evt.total.currency + '#' + evt.total.value + '#' + evt.methodData[0].data.creditorName + '#' + evt.methodData[0].data.creditorAccount);
  }));
});
