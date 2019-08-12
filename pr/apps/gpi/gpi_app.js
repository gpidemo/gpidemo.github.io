/**
 * Builds PaymentRequest for credit cards, but does not show any UI yet.
 */
function initPaymentRequest() {
  let networks = ['amex', 'jcb', 'visa'];
  
  let supportedInstruments = [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: networks, 
      supportedTypes: ['debit', 'credit', 'prepaid']
    }
  }, {
    supportedMethods: 'https://apple.com/apple-pay',
    data: {
        version: 2,
        supportedNetworks: networks,
        countryCode: 'US',
        merchantIdentifier: 'whatwebcando.today.sample',
        merchantCapabilities: ['supportsDebit', 'supportsCredit', 'supports3DS']
    }
  }];

  let details = {
    total: {label: 'Donation', amount: {currency: 'EUR', value: '10.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'EUR', value: '15.00'}
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'EUR', value: '-5.00'}
      }
    ]
  };

  return new PaymentRequest(supportedInstruments, details);
}

/**
 * Invokes PaymentRequest for credit cards.
 */
function onBuyClicked(request) {
  request.show()
    .then(instrumentResponse => sendPaymentToServer(instrumentResponse))
    .catch(err => document.getElementById('log').innerText = err);
}

/**
 * Simulates processing the payment data on the server.
 */
function sendPaymentToServer(instrumentResponse) {
  // There's no server-side component of these samples. No transactions are
  // processed and no money exchanged hands. Instantaneous transactions are not
  // realistic. Add a 2 second delay to make it seem more real.
  
  window.setTimeout(function () {
    instrumentResponse.complete('success')
        .then(() => document.getElementById('log').innerHTML = resultToTable(instrumentResponse))
        .catch(err => document.getElementById('log').innerText = err);
  }, 2000);
}

/**
 * Converts the payment instrument into a JSON string.
 */
function resultToTable(result) {
  return '<table class="table table-striped">' +
    '<tr><td>Method name</td><td>' + result.methodName + '</td></tr>' +
    '<tr><td>Billing address</td><td>' + (result.details.billingAddress || {}).addressLine + ', ' + (result.details.billingAddress || {}).city + '</td></tr>' +
    '<tr><td>Card number</td><td>' + result.details.cardNumber + '</td></tr>' +
    '<tr><td>Security code</td><td>' + result.details.cardSecurityCode + '</td></tr>' +
    '<tr><td>Cardholder name</td><td>' + result.details.cardholderName + '</td></tr>' +
    '<tr><td>Expiry date</td><td>' + result.details.expiryMonth + '/' + result.details.expiryYear + '</td></tr>' +
    '</table>';
}

function donate() {
  if (!window.PaymentRequest) {
    alert('This browser does not support Web Payments API');
    return;
  }
    
  let request = initPaymentRequest();
  onBuyClicked(request);
}
HTML
<p><button class="btn btn-default" onclick="donate()">Donate 10€ to What Web Can Do ??</button> (demo only, no actual payment is processed)</p>

<p id="log"></p>

<p><small>Demo based on <a href="https://googlechrome.github.io/samples/paymentrequest/credit-cards/">Google Chrome GitHub repository</a>.</small></p>
Browser support
