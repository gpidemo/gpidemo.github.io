self.method = null;
self.resolver = null;
var methodData = null;


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
    fetch('https://gpilinkmanual.swiftlabapis.com/payment-initiation', {
        method: 'POST',
        body: '',
        headers: new Headers({
          "x-api-key": ""
        })
      })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json;
        }
        respond('failure', '');
      }).then((jsonResponse) => {
        console.log(jsonResponse);
        respond('success', '972a99ab-46e8-4fbd-ae6e-77cf56909dc2');
        })
      .catch((err) => {
      console.error(err);
      respond('failure', '');
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
    methodData = event.methodData[0];
    evt.openWindow('confirm.html#' + evt.total.currency + '#' + evt.total.value + '#' + evt.methodData[0].data.creditorName + '#' + evt.methodData[0].data.creditorAccount);
  }));
});
