self.method = null;
self.resolver = null;

self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('message', (evt) => {
  if (evt.data === 'confirm' && self.resolver !== null) {
    self.resolver({
      methodName: self.method,
      details: {        	
        uetr: '972a99ab-46e8-4fbd-ae6e-77cf56909dc2',
        status: 'ACCP',
      },
    });
    self.resolver = null;
    // evt.openWindow('getstatus.html#' + evt.details.uetr);
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
