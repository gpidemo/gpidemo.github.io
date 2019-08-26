self.method = null;
self.resolver = null;

self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('message', (evt) => {
  if (evt.data === 'confirm' && self.resolver !== null) {
 

var xhr = new XMLHttpRequest();
xhr.open("POST", 'https://gpilinkmanual.swiftlabapis.com/payment-initiation', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function() { // Call a function when the state changes.
  console.log(this.status)
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
       
    }
}

xhr.send(JSON.stringify(evt.methodData[0].data.creditTransferData));


 
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
