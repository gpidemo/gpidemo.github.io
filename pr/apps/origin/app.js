self.method = null;
self.resolver = null;
var methodData = null;
var activeUetr = null;
var simulator = true;
var simulatorStatus = 'INIT';

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

function statusRespond(statusResponse) {
  self.resolver(statusResponse);
  self.resolver = null;
}


self.addEventListener('message', (evt) => {

  console.log ('Event: ', evt.data)

  switch (evt.data.command) {
  case 'confirm': 
  if (!simulator) {
    if (self.resolver !== null) {
    fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/payment_initiation', {
        method: 'POST',
        body: JSON.stringify(methodData.data.creditTransferData),
        headers: new Headers({
          "Content-Type": "application/json",
          "x-api-key": methodData.data.apiKey,
          })
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          respond('failure', '');
          })
        .then((jsonResponse) => {
            console.log('UETR:', jsonResponse.uetr);
            methodData.data.uetr = jsonResponse.uetr;
            console.log('methodData.data.uetr:', methodData.data.uetr);
            respond('success', jsonResponse.uetr);
          })
        .catch((err) => {
             console.log(err);
             respond('failure', JSON.stringify(err));
          });
        };
      } else
      {
        console.log('Payment Initiation: simulator data');
        simulatorStatus = 'INIT';
        console.log (evt.ports);
        respond('success', methodData.data.uetr);
      };
        break;
     case 'getstatus': 
     if (!simulator) {
        activeUetr = evt.data.details; 
        fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/' + activeUetr + '/tracker_status', {
            method: 'GET',
            headers: new Headers({
              "x-api-key": methodData.data.apiKey,
              "accept" : "application/json",
              })
            })
            .then((response) => {
              // console.log('GetStatus', response);
              if (response.ok) {
                return response.json();
              }
              // respond('failure', '');
              console.log ('Failure - reponse.ok');
              })
            .then((jsonResponse) => {
                var statusResponse = {  
                 uetr : jsonResponse.uetr, 
                 status : jsonResponse.transaction_status.status };
                console.log ("Status Response", statusResponse);
                var statusPort = evt.ports[0];
                statusPort.postMessage (statusResponse);
                console.log ('CallBack Done');
              })
            .catch((err) => {
                 console.log(err);
                 // respond('failure', JSON.stringify(err));
              });
              } else
              {
                console.log('Get Status: simulator data');
                // console.log('Event:', evt);
                // console.log ('Event ports', evt.ports);
                simulatorStatus = "ACSP";
                var statusResponse = {  
                    uetr : evt.data.details, 
                  status : simulatorStatus};
                 console.log ("Get Status Response", statusResponse);
                 // var port = evt.ports[0];
                 statusRespond (statusResponse);
                 console.log ('CallBack Done');
                };
              break;
     case 'setstatus': 
        if (!simulator) {
        activeUetr = evt.data.details; 
        console.log('Active UETR: ', activeUetr)
        fetch('https://u6b176ktza.execute-api.eu-west-1.amazonaws.com/test/glink/' + activeUetr + '/tracker_status?newstatus=ACCC', {
            method: 'POST',
            headers: new Headers({
              "x-api-key": methodData.data.apiKey,
              "accept" : "application/json",
              })
            })
            .then((response) => {
              // console.log('SetStatus', response);
              if (response.ok) {
                return response.json();
              }
              // respond('failure', '');
              console.log ('Failure - reponse.ok');
              })
            .then((jsonResponse) => {
                //console.log(jsonResponse);
                console.log('Set Status Body:', jsonResponse);
                // console.log('Status UETR:', jsonResponse.uetr);
                // respond('success', jsonResponse.uetr);
                // var statusPort = evt.ports[0];
                var statusResponse = {  
                  uetr : jsonResponse.uetr, 
                  status : 'ACCC' };
                 console.log ("Status Response", statusResponse);
                 evt.ports[0].postMessage (statusResponse);
                 console.log ('CallBack Done');
            
              })
            .catch((err) => {
                 console.log(err);
                 // respond('failure', JSON.stringify(err));
              });
            } else
            {
              console.log('Set Status: simulator data');
               simulatorStatus = "ACCC";
               // console.log('Event:', evt);
               // console.log ('Event ports', evt.ports);
                 var statusResponse = {  
                 uetr : evt.data.details, 
                 status : simulatorStatus};
              console.log ("Get Status Response", statusResponse);
              // var port = evt.ports[0];
              statusRespond (statusResponse);
              console.log ('CallBack Done');
            };
          break;
     default: 
        console.log('Unrecognized message: ' + evt.data);
  }

});



self.addEventListener('paymentrequest', (evt) => {
  // console.log(evt)
  self.method = evt.methodData[0].supportedMethods;
  evt.respondWith(new Promise((resolve, reject) => {
    self.resolver = resolve;
    methodData = evt.methodData[0];

    //console.log(methodData)
    
    /*
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
          respond('success', jsonResponse.uetr);
       })
        .catch((err) => {
             console.log(err);
             respond('failure', JSON.stringify(err));
          });
      */
      evt.openWindow('confirm.html#' + evt.total.currency + '#' + evt.total.value + '#' + evt.methodData[0].data.creditTransferData.debtorName + '#' + evt.methodData[0].data.creditTransferData.debtorAccount);
  }));
});

