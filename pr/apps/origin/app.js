self.method = null;
self.resolver = null;
var methodData = null;
var activeUetr = null;

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

  console.log ('Event: ', evt.data)

 if (self.resolver !== null) {
  switch (evt.data) {
  case 'confirm': 
 //   console.log(methodData)
 
 //   console.log(JSON.stringify(methodData.data.creditTransferData));
    fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/payment_initiation', {
        method: 'POST',
        body: JSON.stringify(methodData.data.creditTransferData),
        headers: new Headers({
          "Content-Type": "application/json",
          "x-api-key": methodData.data.apiKey,
          })
        })
        .then((response) => {
  //        console.log(response);
          if (response.ok) {
            return response.json();
          }
          respond('failure', '');
          })
        .then((jsonResponse) => {
            //console.log(jsonResponse);
   //         console.log('Body:', jsonResponse);
            console.log('UETR:', jsonResponse.uetr);
            console.log(activeUetr);
      respond('success', jsonResponse.uetr);
          })
        .catch((err) => {
             console.log(err);
             respond('failure', JSON.stringify(err));
          });
        break;
     case 'getstatus': 
        activeUetr = sessionStorage.getItem("uetr");
        console.log('Active UETR: ', activeUetr)
        console.log('Get methodData:', methodData);
    
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
                respond('success', jsonResponse.uetr);
              })
            .catch((err) => {
                 console.log(err);
                 respond('failure', JSON.stringify(err));
              });
            break;
     default: 
    console.log('Unrecognized message: ' + evt.data);
  }
}
});



self.addEventListener('paymentrequest', (evt) => {
  console.log(evt)
  self.method = evt.methodData[0].supportedMethods;
  evt.respondWith(new Promise((resolve, reject) => {
    self.resolver = resolve;
    methodData = evt.methodData[0];

    console.log(methodData)
    fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/payment_initiation', {
        method: 'POST',
        body: JSON.stringify(methodData.data.creditTransferData),
        headers: new Headers({
          "Content-Type": "application/json",
          "x-api-key": methodData.data.apiKey,
          })
        })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
          respond('failure', '');
          })
        .then((jsonResponse) => {
          //console.log(jsonResponse);
          console.log('Body:', jsonResponse);
          console.log('UETR:', jsonResponse.uetr);

          activeUetr = jsonResponse.uetr;
          respond('success', jsonResponse.uetr);
       })
        .catch((err) => {
             console.log(err);
             respond('failure', JSON.stringify(err));
          });


//    evt.openWindow('confirm.html#' + evt.total.currency + '#' + evt.total.value + '#' + evt.methodData[0].data.creditTransferData.debtorName + '#' + evt.methodData[0].data.creditTransferData.debtorAccount);
  }));
});

